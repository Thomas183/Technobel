import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartModule} from "primeng/chart";
import {PaginatorModule} from "primeng/paginator";
import {DisplayViewsComponent} from "./components/display-views/display-views.component";



@NgModule({
    declarations: [
        DisplayViewsComponent
    ],
    exports: [
        DisplayViewsComponent
    ],
    imports: [
        CommonModule,
        ChartModule,
        PaginatorModule
    ]

})
export class SharedModule { }
