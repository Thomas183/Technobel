import {Injectable} from '@angular/core';
import {DataTable, Table} from "@models/api/table";
import {HttpClient, HttpParams} from "@angular/common/http";
import {n} from "@fullcalendar/core/internal-common";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TableService {

    baseUrl: string = environment.baseUrl + '/tables'

    tables: Array<Table> = [];

    constructor(private _httpClient: HttpClient) {
    }

    getTables(page: number, size: number, from?: string): Observable<{
        pages: number,
        page: number,
        size: number,
        data: Array<DataTable>
    }> {
        const params: HttpParams = new HttpParams()
            .append('page', page)
            .append('size', size)
        if (from) {
            params.append('from', from);
        }

        return this._httpClient.get<{
            pages: number,
            page: number,
            size: number,
            data: Array<DataTable>
        }>(`${this.baseUrl}`, {params: params})
    }


    createTable(table: { table: string, headers: Array<{ name: string }> }): Observable<{id: string}> {
        return this._httpClient.post<{id: string}>(`${this.baseUrl}`, table)
    }

    getTable(tableId: string): Observable<DataTable> {
        return this._httpClient.get<DataTable>(`${this.baseUrl}/${tableId}`)
    }

    updateTable(tableId: string, updatedTable: { table: string, headers: Array<{ name: string }> }): Observable<null> {
        return this._httpClient.put<null>(`${this.baseUrl}/${tableId}`, updatedTable);
    }

    deleteTable(tableId: string): Observable<null> {
        return this._httpClient.delete<null>(`${this.baseUrl}/${tableId}`);
    }

    deleteTables(amount: number): void {
        this.getTables(0, amount).subscribe({
            next: (tables) => {
                tables.data.forEach(data => {
                    this.deleteTable(data.id).subscribe()
                })
            }
        })
    }
}
