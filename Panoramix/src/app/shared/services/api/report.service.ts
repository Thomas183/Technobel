import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {SchemaTable, SchemaTableForm} from "@models/api/schematic";
import {Report} from "@models/api/report";

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(private _httpClient: HttpClient) {

    }

    reportId: string;
    projectsUrl: string = environment.baseUrl + '/projects';
    projectUrl: string = environment.baseUrl + '/project';


    // Rapport
    getReports(page: number, size: number, from?: 'OWNER' | 'SHARED' | 'PUBLIC'): Observable<{
        pages: number,
        page: number,
        size: number,
        data: Array<Report>
    }> {
        const httpParams = new HttpParams()
            .append('page', page)
            .append('size', size)
        if (from) {
            httpParams.append('from', from)
        }

        return this._httpClient.get<{
            pages: number,
            page: number,
            size: number,
            data: Array<Report>
        }>(this.projectsUrl, {params: httpParams});
    }

    createReport(name: string, description: string): Observable<{ id: string }> {
        return this._httpClient.post<{ id: string }>(`${this.projectsUrl}`, {name: name, description: description});
    }

    getReport(reportId: string): Observable<Report> {
        return this._httpClient.get<Report>(`${this.projectsUrl}/${reportId}`)
    }

    updateReport(reportId: string, name: string, description: string, isPublic: boolean): Observable<null> {
        return this._httpClient.put<null>(`${this.projectsUrl}/${reportId}`, {
            name: name,
            description: description,
            isPublic: isPublic
        })
    }

    deleteReport(reportId: string): Observable<null> {
        return this._httpClient.delete<null>(`${this.projectsUrl}/${reportId}`)
    }


    // Schémas
    getReportSchematics(reportId: string): Observable<Array<SchemaTable>> {
        return this._httpClient.get<Array<SchemaTable>>(`${this.projectsUrl}/${reportId}/schema`);
    }

    editSchematic(reportId: string, schematic: Array<SchemaTableForm>): Observable<null> {
        return this._httpClient.put<null>(`${this.projectsUrl}/${reportId}/schema`, schematic)
    }

    getReportSchematicIds(reportId: string): Observable<Array<string>> {
        return this._httpClient.get<Array<string>>(`${this.projectsUrl}/${reportId}/schema/tables`)
    }

    addTableToReport(reportId: string, tableId: string): Observable<null> {
        return this._httpClient.post<null>(`${this.projectsUrl}/${reportId}/schema/tables/${tableId}`, null)
    }

    deleteTableFromSchematic(reportId: string, tableId: string): Observable<null> {
        return this._httpClient.delete<null>(`${this.projectsUrl}/${reportId}/schema/tables/${tableId}`);
    }

    // updateHeaderMetadata(reportId: string, headerId: string): Observable<null>{
    //     return this._httpClient.patch(`${this.baseUrl}/${reportId}/schema/headers/${headerId}`)
    // }

}
