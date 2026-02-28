import {HistoryLog} from "../historyLog";

export interface Report {
    id: string;
    name: string;
    description: string;
    isPublic: boolean,
    log: HistoryLog,
}

export interface ReportFormCreate {
    name: string,
    description: string,
}

export interface ProjectFormUpdate {
    name: string,
    description: string,
    isPublic: boolean,
}

export interface ProjectPermissions {
    email: Array<string>;
}
