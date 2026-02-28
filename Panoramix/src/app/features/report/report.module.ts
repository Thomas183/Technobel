import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateReportComponent} from "./create-report/create-report.component";
import {ExploreReportsComponent} from "./explore-reports/explore-reports.component";
import {MyReportsComponent} from "./my-reports/my-reports.component";
import {ReportRoutingModule} from "./report-routing.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ViewReportComponent } from './view-report/view-report.component';
import {PaginatorModule} from "primeng/paginator";
import {ChartModule} from "primeng/chart";
import {SharedModule} from "../../shared/shared.module";
import {ToastModule} from "primeng/toast";


@NgModule({
    declarations: [
        CreateReportComponent,
        ExploreReportsComponent,
        MyReportsComponent,
        ViewReportComponent,
    ],
    imports: [
        DragDropModule,
        CommonModule,
        ReportRoutingModule,
        ReactiveFormsModule,
        InputTextareaModule,
        InputTextModule,
        ListboxModule,
        TableModule,
        ButtonModule,
        PaginatorModule,
        ChartModule,
        SharedModule,
        ToastModule
    ]
})
export class ReportModule { }
