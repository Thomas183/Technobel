import {HistoryLog} from "../historyLog";

export interface Table {
    id: string,
    table: string,
    headers:
        Array<{
            name: string
            type: string
        }>
}

export interface TablePermissions {
    email: Array<string>,
}

export interface DataTable {
    id: string,
    table: string,
    headers: Array<{
        id: string,
        name: string,
    }>
    log: HistoryLog,
}


export interface DataTableFormCreate {
    table: string,
    headers: Array<{
        name: string,
    }>
}

export interface DataTableFormUpdate {
    table: string,
    headers: Array<{
        id: string,
        name: string,
    }>
}
