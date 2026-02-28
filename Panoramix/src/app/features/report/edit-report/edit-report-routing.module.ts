import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditReportComponent} from "./edit-report.component";
import {EditSchematicComponent} from "./edit-schematic/edit-schematic.component";
import {EditViewsComponent} from "./edit-views/edit-views.component";
import {EditInfoComponent} from "./edit-info/edit-info.component";


const routes: Routes = [
    {
        path: '',
        component: EditReportComponent,
        children: [
            {path: 'editInfo', component: EditInfoComponent},
            {path: 'editSchematics', component: EditSchematicComponent},
            {path: 'editViews', component: EditViewsComponent},
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditReportRoutingModule {
}
