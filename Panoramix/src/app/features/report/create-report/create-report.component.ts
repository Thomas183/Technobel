import {Component, OnInit, Type} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Report} from '@models/api/report';

import {TableService} from "@services/api/table.service";
import {ListboxChangeEvent} from "primeng/listbox";
import {ReportService} from "@services/api/report.service";
import {DataTable} from '@models/api/table';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {ToastModule} from 'primeng/toast';
import {Message, MessageService} from 'primeng/api';


@Component({
    selector: 'app-create-report',
    templateUrl: './create-report.component.html',
    styleUrls: ['./create-report.component.scss'],
    providers: [MessageService]
})
export class CreateReportComponent implements OnInit {

    selectedTables: Array<DataTable> = [];
    tableList: Array<DataTable>;

    messages: Array<Message> = [
        {severity: 'success', summary: 'Succès', detail: 'Rapport créé !, redirection'}, // 0
        {severity: 'warning', summary: 'Attention', detail: 'Formulaire invalide'} // 1
    ]

    ngOnInit(): void {
        //Récupération des tables
        this._tableService.getTables(0, 1000).subscribe({
            next: (value) => {
                this.tableList = value.data
            }
        });
    }

    // Formulaire
    registerForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _tableService: TableService,
        private _reportService: ReportService,
        private _router: Router,
        private _messageService: MessageService,
    ) {
        this.registerForm = this._fb.group({
            name: [null, Validators.required,],
            description: [null, Validators.required],
            csv: [null,]
        });
    }

    //Création du report
    createReport() {
        if (!this.registerForm.valid) {
            this.displayMessage(1)
            this.registerForm.markAllAsTouched();
            return
        }

        //Récupération des données du formulaire
        const ReportName: string = this.registerForm.get('name').value
        const ReportDescription: string = this.registerForm.get('description').value

        //Envoi du rapport
        this._reportService.createReport(ReportName, ReportDescription).subscribe({
            next: (report) => {
                this.addSelectedTablesToReport(report.id)
            },
        })
    }

    onChange(event: ListboxChangeEvent) {
        this.selectedTables = []
        this.selectedTables = event.value
    }

    addSelectedTablesToReport(reportId: string) {
        this.selectedTables.forEach((table, index) => {
            this._reportService.addTableToReport(reportId, table.id).subscribe({
                complete: () => {
                    if (index === this.selectedTables.length-1) {
                        //Redirection vers "mes rapports"
                        this.displayMessage(0);
                        setTimeout(() => {
                            this._router.navigate(['/report/myReports']);
                        }, 2000)
                    }
                }
            })
        })
    }

    displayMessage(message: number) {
        this._messageService.add(this.messages[message])

        setTimeout(() => {
            this._messageService.clear()
        }, 2000)
    }
}
