import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DisplayViewService} from "@services/displayView.service";
import {Report} from "@models/api/report";
import {ReportService} from "@services/api/report.service";

@Component({
    selector: 'app-view-report',
    templateUrl: './view-report.component.html',
    styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {

    report: Report;
    reportId: string;

    constructor(private _route: ActivatedRoute, private _displayViewService: DisplayViewService, private _reportService: ReportService) {
    }

    ngOnInit() {
        this._route.params.subscribe(params => {
            this.reportId = params['id'];
            if (this.reportId) {
                this._displayViewService.reportId = this.reportId;
                this._displayViewService.getCharts();
                this._reportService.getReport(this.reportId).subscribe({
                    next: (report) => {
                        this.report = report;
                    }
                })
            }
        })



    }

}
