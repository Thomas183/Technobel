import {Injectable} from '@angular/core';
import * as Papa from 'papaparse';
import {ParseResult} from 'papaparse';
import {DataTable, DataTableFormCreate} from "@models/api/table";
import {DataTableForm} from "@models/data-table-form";
import {KeyValue} from "@angular/common";
import {DataRow} from "@models/api/data";

@Injectable({
    providedIn: 'root'
})
export class DataParserService {

    constructor() {
    }

    parseCsvFile(file: string, title: string): Promise<{ table: DataTableFormCreate, data: Array<DataRow> }> {
        return new Promise((resolve) => {
            Papa.parse(file, {
                complete: (result) => {
                    resolve(this.structurePapaparseResult(result, title));
                }, header: true,
            });
        });
    }

    private structurePapaparseResult(papaResult: ParseResult<any>, title: string): {
        table: DataTableFormCreate,
        data: Array<DataRow>
    } {
        // Get headers
        const headers: Array<{ name: string }> = []
        for (let header of papaResult.meta.fields) {
            headers.push({name: header})
        }

        // Get Data
        let data: Array<DataRow> = []
        for (let dataRow of papaResult.data) {
            data.push(dataRow);
        }

        data = this.filterOutObjectsWithEmptyFields(data)

        return {
            table:
                {
                    table: title,
                    headers: headers,
                },
            data: data
        }
    }
    filterOutObjectsWithEmptyFields<T extends { [key: string]: string | number }>(dataArray: T[]): T[] {
        return dataArray.filter(item => !Object.values(item).some(value => value === ''));
    }
}
