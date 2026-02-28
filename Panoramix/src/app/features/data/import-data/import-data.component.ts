import {Component, OnInit} from '@angular/core';
import {FileInfo} from "@models/file-info";
import {DataParserService} from "@services/dataParser.service";
import {TableService} from "@services/api/table.service";
import {DataService} from "@services/api/data.service";
import {DataTableFormCreate} from "@models/api/table";
import {DataRow} from "@models/api/data";
import {FileUploadEvent} from "primeng/fileupload";

@Component({
    selector: 'app-import-data',
    templateUrl: './import-data.component.html',
    styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent implements OnInit {
    constructor(
        private _parser: DataParserService,
        private _tableService: TableService,
        private _dataService: DataService) {
    }

    ngOnInit() {
    }

    fileInfoList: Array<FileInfo> = [];
    selectedFile: File;
    dataToUpload: Array<{ table: DataTableFormCreate, data: Array<DataRow> }> = [];

    onSelect(event: FileUploadEvent): void {
        const file = event.files[0]
        this.selectedFile = file
        this.getFileInfo(file)
        this.parseCsv(file)
    }

    parseCsv(loadedFile: File) {
        const reader: FileReader = new FileReader();

        reader.onload = (file: any) => {
            const text = file.target.result;
            this._parser.parseCsvFile(text, loadedFile.name).then(parsedCsv => {
                this.dataToUpload.push(parsedCsv);
            })
        };

        reader.readAsText(loadedFile);
    }

    getFileInfo(file: File) {
        this.fileInfoList.push({
            name: file.name,
            size: file.size
        })
    }

    clearFiles() {
        this.fileInfoList = [];
        this.dataToUpload = [];
    }

    onDelete(index: number) {
        this.fileInfoList.splice(index, 1);
        this.dataToUpload.splice(index, 1);
    }

    addDataToTable(tableId: string, data: Array<DataRow>) {
        this._dataService.addDataToTable(tableId, data).subscribe({})
    }

    logTables(){
        this._tableService.getTables(0, 1).subscribe({
            next: (tables) => {
            }
        })
    }

    deleteTables(){
        this._tableService.deleteTables(100);
    }

    uploadFiles() {
        for (let table of this.dataToUpload) {
            this._tableService.createTable({table: table.table.table, headers: table.table.headers}).subscribe({
                next: (tableId) => {
                    this.addDataToTable(tableId.id, table.data)
                },
                complete: () => {

                }
            })
        }
        this.clearFiles()
    }
}
