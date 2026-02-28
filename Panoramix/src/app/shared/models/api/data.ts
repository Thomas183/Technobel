import {HistoryLog} from "../historyLog";
import {KeyValue} from "@angular/common";

export interface Data {
    id: string,
    values: DataRow,
    log: HistoryLog,
}

export interface DataRow {
    [key: string]: string
}
