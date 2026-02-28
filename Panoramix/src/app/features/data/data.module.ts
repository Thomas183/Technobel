import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExploreDataComponent} from "./explore-data/explore-data.component";
import {ImportDataComponent} from "./import-data/import-data.component";
import {MyDataComponent} from "./my-data/my-data.component";
import {DataRoutingModule} from "./data-routing.module";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";



@NgModule({
  declarations: [
      ExploreDataComponent,
      ImportDataComponent,
      MyDataComponent,
  ],
    imports: [
        CommonModule,
        DataRoutingModule,
        FileUploadModule,
        TableModule,
    ]
})
export class DataModule { }
