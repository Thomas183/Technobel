import {Component} from '@angular/core';
import {ReportService} from '@services/api/report.service';
import {Report} from '@models/api/report';
import {Router} from '@angular/router';
import {log10} from "chart.js/helpers";

@Component({
    selector: 'app-explore-reports',
    templateUrl: './explore-reports.component.html',
    styleUrls: ['./explore-reports.component.scss']
})
export class ExploreReportsComponent {
    reportList: Report[] = [];

    constructor(
        private _reportService: ReportService,
        private _router: Router,
    ) {
    }

    ngOnInit(): void {
        this._reportService.getReports(0, 30).subscribe({
            next: (reports) => {
                for (let report of reports.data){
                    if (report.isPublic){
                        this.reportList.push(report)
                    }
                }
            }
        })
    }


    viewReport(reportId: string){
        this._router.navigate(['/report/viewReport', reportId])
    }
}
