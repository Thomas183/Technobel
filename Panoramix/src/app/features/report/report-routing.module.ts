import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateReportComponent} from "./create-report/create-report.component";
import {MyReportsComponent} from "./my-reports/my-reports.component";
import {ExploreReportsComponent} from "./explore-reports/explore-reports.component";
import {ViewReportComponent} from "./view-report/view-report.component";

const routes: Routes = [
    {
        path: 'createReport',
        component: CreateReportComponent,
    },
    {
        path: 'myReports',
        component: MyReportsComponent,
    },
    {
        path: 'exploreReports',
        component: ExploreReportsComponent,
    },
    {
        path: 'viewReport/:id',
        component: ViewReportComponent,
    },
    {
        path: 'editReport/:id',
        loadChildren: () => import('./edit-report/edit-report.module').then(m => m.EditReportModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule { }
