import {HistoryLog} from "../historyLog";

export interface Profile {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
}

export interface User {
    id: string
    firstName: string,
    lastName: string,
    role: 'USER' | 'ADMIN',
    isActivated: boolean
    log: HistoryLog;
}

export interface UserFormCreate {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: 'USER' | 'ADMIN',
    isActivated: boolean,
}

export interface UserFormPatch {
    firstName: string,
    lastName: string,
    email: string,
    role: 'USER' | 'ADMIN'
}

export interface LoginForm {
    email : string,
    password: string
}

