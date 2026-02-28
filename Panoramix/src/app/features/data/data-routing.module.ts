import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImportDataComponent} from "./import-data/import-data.component";
import {MyDataComponent} from "./my-data/my-data.component";
import {ExploreDataComponent} from "./explore-data/explore-data.component";



const routes: Routes = [
    {
        path: 'importData',
        component: ImportDataComponent,
    },
    {
        path: 'myData',
        component: MyDataComponent,
    },
    {
        path: 'exploreData',
        component: ExploreDataComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataRoutingModule { }
