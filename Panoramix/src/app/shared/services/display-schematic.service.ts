import {Injectable} from '@angular/core';
import {SchemaTable, SchemaTableForm} from "@models/api/schematic";
import {ReportService} from "@services/api/report.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ErrorForm} from "@models/api/error";
import {TableService} from "@services/api/table.service";
import {DataTable} from "@models/api/table";

@Injectable({
    providedIn: 'root'
})
export class DisplaySchematicService {

    reportId: string;

    private _schematics: BehaviorSubject<SchemaTable[]> = new BehaviorSubject([]);
    public schematics: Observable<SchemaTable[]> = this._schematics.asObservable();

    constructor(private _reportService: ReportService, private _tableService: TableService) {
    }

    initializeSchematics(): void {

        this._reportService.getReportSchematics(this.reportId).subscribe({
            next: (schematics) => {
                this._schematics.next(schematics)
            }
        })
    }

    saveSchematics(schematics: SchemaTable[]): Observable<null> {
        const schematicForm: Array<SchemaTableForm> = [];

        for (let schematic of schematics) {
            schematicForm.push({
                id: schematic.id,
                fact: schematic.fact,
                headers: schematic.headers,
                coord: {
                    x: 0,
                    y: 0,
                }
            })
        }
        return this._reportService.editSchematic(this.reportId, schematicForm)
    }
}
