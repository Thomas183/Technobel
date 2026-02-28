import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DisplayViewService} from "@services/displayView.service";
import {HttpClient} from "@angular/common/http";
import {ReportService} from "@services/api/report.service";
import {first} from "rxjs";
import {DisplaySchematicService} from "@services/display-schematic.service";

@Component({
    selector: 'app-edit-report',
    templateUrl: './edit-report.component.html',
    styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit, OnDestroy {

    menuItems: any = [
        {label: 'Général', icon: 'pi pi-cog', routerLink: 'editInfo'},
        {label: 'Schéma', icon: 'pi pi-sitemap', routerLink: 'editSchematics'},
        {label: 'Vues', icon: 'pi pi-chart-bar', routerLink: 'editViews'},
    ]

    reportId: string;

    constructor(
        private _displayViewService: DisplayViewService,
        private _displaySchematicService: DisplaySchematicService,
        private _route: ActivatedRoute) {

    }

    ngOnInit() {
        this._route.params.subscribe(params => {
            this.reportId = params['id'];
            if (this.reportId) {
                this._displayViewService.reportId = this.reportId;
                this._displayViewService.getCharts();

                this._displaySchematicService.reportId = this.reportId;
                this._displaySchematicService.initializeSchematics();
            }
        })
    }

    ngOnDestroy() {
    }


}
