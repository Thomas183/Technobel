import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {n} from "@fullcalendar/core/internal-common";
import {Data} from "@models/api/data";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    baseUrl: string = environment.baseUrl + '/tables';

    constructor(private _httpClient: HttpClient) {
    }

    getTableData(tableId: string, page: number, size: number): Observable<{
        pages: number,
        page: number,
        size: number,
        data: Array<Data>
    }> {
        const params : HttpParams = new HttpParams()
            .append('page', page)
            .append('size', size)
        return this._httpClient.get<{
            pages: number,
            page: number,
            size: number,
            data: Array<Data>
        }>(`${this.baseUrl}/${tableId}/data`, {params: params})
    }

    addDataToTable(tableId: string, data: Array<object>): Observable<null>{
        return this._httpClient.post<null>(`${this.baseUrl}/${tableId}/data`, data)
    }

}
