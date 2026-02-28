import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _auth : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._auth.getToken()
    if(token){
      let clone = request.clone({
        headers: request.headers.set('Authorization', 'bearer '+token)
      })
      return next.handle(clone)
    }

    return next.handle(request);
  }
}

export const TokenInterceptorProvider = {
  provide : HTTP_INTERCEPTORS,
  useClass : TokenInterceptor,
  multi : true
}
