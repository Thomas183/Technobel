import {Component, OnInit} from '@angular/core';
import {ReportService} from "@services/api/report.service";
import {Message, MessageService} from "primeng/api";
import {DisplayViewService} from "@services/displayView.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-edit-info',
    templateUrl: './edit-info.component.html',
    styleUrls: ['./edit-info.component.scss'],
    providers: [MessageService]
})
export class EditInfoComponent implements OnInit {

    confirmVisible: boolean;

    reportId: string;
    reportTitle: string = '';
    reportDescription: string = '';
    isPublic: boolean = false;
    messages: Array<Message> = [
        {summary: 'Rapport modifié avec succès', severity: 'success'},
        {summary: 'Rapport supprimé avec succès', severity: 'success'}
    ]


    constructor(
        private _reportService: ReportService,
        private _messageService: MessageService,
        private _editViewService: DisplayViewService,
        private _router: Router) {

    }

    ngOnInit() {
        this.reportId = this._editViewService.reportId;
        this.getReport();
    }

    updateReport(): void {
        this._reportService.updateReport(this.reportId, this.reportTitle, this.reportDescription, this.isPublic).subscribe({
            next: () => {
                this.displayMessage(0)
            }
        })
    }

    showConfirm() {
        if (!this.confirmVisible) {
            this._messageService.add({ key: 'confirm', sticky: true, severity: 'warn', summary: 'Supprimer le projet ?'});
            this.confirmVisible = true;
        }
    }

    onConfirm() {
        this._messageService.clear('confirm');
        this.confirmVisible = false;
        this.deleteReport();
    }

    onReject() {
        this._messageService.clear('confirm');
        this.confirmVisible = false;
    }

    deleteReport() {
        this._reportService.deleteReport(this.reportId).subscribe({
            next: () => {
              this.displayMessage(1)
            },
            complete: () => {
                setTimeout(() => {
                    this._router.navigate(['dashboard'])
                }, 2000)
            }
        })
    }

    displayMessage(message: number) {
        this._messageService.add(this.messages[message])
        setTimeout(() => {
            this._messageService.clear()
        }, 3500)
    }

    getReport(): void {
        this._reportService.getReport(this.reportId).subscribe({
            next: (report) => {
                this.reportTitle = report.name;
                this.reportDescription = report.description;
                this.isPublic = report.isPublic;
            }
        })
    }
}
