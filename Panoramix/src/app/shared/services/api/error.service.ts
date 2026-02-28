import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    handleError(error: HttpErrorResponse): Observable<never> {
        switch (error.status) {
            case 404:
                break;
            case 403:
                break;
            case 500:
                break;
            default:
                break;
        }
        return throwError(error)
    }

    constructor() {
    }
}
