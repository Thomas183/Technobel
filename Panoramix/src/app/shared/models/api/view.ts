import {HistoryLog} from "../historyLog";

export interface View {
    id: string,
    log: HistoryLog,
    chart: 'BAR' | 'RADAR' | 'PIE',
    label: {
        table: string,
        field: string,
    }
    data?: {
        table: string,
        field: string,
        pkValue?: string
    }
}

export interface Chart {
    labels: Array<string>,
    datasets: Array<{
        label: string,
        data: number[],
    }>
}

export interface FullChart {
    viewId: string
    type: 'BAR' | 'RADAR' | 'PIE'
    labels: Array<string>,
    datasets: Array<{
        label: string,
        data: number[],
        backgroundColor? : string[],
        borderColor?: string[],
        borderWidth?: number,
    }>
}

export interface ViewForm {
    chart: 'BAR' | 'RADAR' | 'PIE'
    label: {
        table: string,
        field: string,
    }
    data?: {
        table: string,
        field: string,
        value? : string,
    }
}
