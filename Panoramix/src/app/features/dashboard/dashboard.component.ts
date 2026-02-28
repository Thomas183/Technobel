import {Component, OnInit} from '@angular/core';
import {AuthService} from '@services/api/auth.service';
import {ReportService} from "@services/api/report.service";
import {TableService} from "@services/api/table.service";
import {ViewService} from "@services/api/view.service";
import {forkJoin, map, Observable, of, switchMap} from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    userCount: number;
    reportCount: number;
    dataCount: number;

    reports: Array<{}> = []

    constructor(
        private _reportService: ReportService,
        private _tableService: TableService,
        private _authService: AuthService,
        private _viewService: ViewService,
        private _router: Router) {
    }

    ngOnInit() {

        this._reportService.getReports(0, 1000).pipe(
            switchMap(reports => {
                this.reportCount = reports.data.length;

                // Filter reports to include only those with isPublic = true
                const publicReports = reports.data.filter(report => report.isPublic);

                if (publicReports.length === 0) {
                    return of([]); // Return an empty array if no public reports
                }

                // Sort public reports by createdAt date (assuming descending order)
                publicReports.sort((a, b) => new Date(b.log.createdAt).getTime() - new Date(a.log.createdAt).getTime());

                const reportObservables = publicReports.map(report =>
                    this.getViewCount(report.id).pipe(
                        map(viewCount => ({
                            ...report,
                            viewCount: viewCount
                        }))
                    )
                );

                return forkJoin(reportObservables);
            })
        ).subscribe(combinedReports => {
            this.reports = combinedReports;
        });


        this._tableService.getTables(0, 1000).subscribe({
            next: (tables) => {
                this.dataCount = tables.data.length
            }
        })

        this._authService.getUsers(0, 1000).subscribe({
            next: (users) => {
                this.userCount = users.data.length
            }
        })
    }

    getViewCount(reportId: string): Observable<number> {
        return this._viewService.getViews(0, 1000, reportId).pipe(
            map(views => views.data.length))
    }

    viewReport(reportId: string) {
        this._router.navigate(['report/viewReport', reportId])
    }
}

