export interface ErrorForm {
    status: number,
    path: string,
    errors: Array<{
        field: string,
        message: string
    }>
}

export interface ErrorConflict {
    status: number,
    path: string,
    error: string
}

export interface ErrorUnauthorized {
    status: number,
    path: string,
    error: string,
}

export interface ErrorForbidden {
    status: number,
    path: string,
    error: string
}
