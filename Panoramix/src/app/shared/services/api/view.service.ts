import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {PageInfo} from "@models/api/page-info";
import {Chart, ViewForm, View} from "@models/api/view";


@Injectable({
    providedIn: 'root'
})
export class ViewService {

    constructor(private _httpClient: HttpClient) {
    }

    baseUrl: string = environment.baseUrl + '/projects'

    getViews(page: number, size: number, projectId: string): Observable<{
        pages: number,
        page: number,
        size: number,
        data: Array<View>
    }> {
        const params: HttpParams = new HttpParams()
            .append('page', page)
            .append('size', size)
        return this._httpClient.get<{
            pages: number,
            page: number,
            size: number,
            data: Array<View>
        }>(`${this.baseUrl}/${projectId}/views`, {params: params})
    }

    createView(projectId: string, view: ViewForm): Observable<{ id: string }> {
        return this._httpClient.post<{ id: string }>(`${this.baseUrl}/${projectId}/views`, view)
    }

    getView(projectId: string, viewId :string): Observable<View> {
        return this._httpClient.get<View>(`${this.baseUrl}/${projectId}/views/${viewId}`)
    }

    updateView(projectId: string, viewId :string, view : ViewForm): Observable<View> {
        return this._httpClient.put<View>(`${this.baseUrl}/${projectId}/views/${viewId}`, view)
    }

    deleteView(projectId: string, viewId :string): Observable<null> {
        return this._httpClient.delete<null>(`${this.baseUrl}/${projectId}/views/${viewId}`)
    }

    getChartFromView(projectId: string, viewId: string): Observable<Chart>{
        return this._httpClient.get<Chart>(`${this.baseUrl}/${projectId}/views/${viewId}/chart`)
    }

    createChartData(projectId: string, chartForm: ViewForm): Observable<Chart>{
        return this._httpClient.post<Chart>(`${this.baseUrl}/${projectId}/chart`, chartForm)
    }
}
