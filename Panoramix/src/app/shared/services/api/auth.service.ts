import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User, UserFormPatch} from '@models/api/users';
import {Register} from '@models/register';
import {UserLogin} from '@models/userLogin';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _baseUrl: string = environment.baseUrl;

    constructor(private _http: HttpClient,
                private _router: Router) {
    }

    getConnectedUser(): Observable<User> {
        return this._http.get<User>(`${this._baseUrl}/auth/profile`)
    }

    createUser(registerForm: Register): Observable<{ id: string }> {
        return this._http.post<{ id: string }>(`${this._baseUrl}/users`, registerForm)
    }

    login(email: string, password: string): Observable<{ token: string }> {
        return this._http.post<{ token: string }>(`${this._baseUrl}/auth/sign-in`, {login: email, password: password})
    }

    logout() {
        localStorage.clear();
        this._router.navigate(['auth/login'])
    }

    getUsers(page: number, size: number): Observable<{ pages: number, page: number, size: number, data: Array<User> }> {
        return this._http.get<{
            pages: number,
            page: number,
            size: number,
            data: Array<User>
        }>(`${this._baseUrl}/users?page=${page}&size=${size}`)
    }

    getById(id: string): Observable<UserFormPatch> {
        return this._http.get<UserFormPatch>(`${this._baseUrl}/users/${id}`);
    }

    updateUser(id: string, user: User): Observable<User> {
        return this._http.patch<User>(`${this._baseUrl}/users/${id}`, user);
    }

    delete(id: string): Observable<User> {
        return this._http.delete<User>(`${this._baseUrl}/users/${id}`);
    }

    changePassword(password: string, token: string): Observable<null> {
        return this._http.post<null>(`${this._baseUrl}/auth/change-password/${token}`, {password: password})
    }

    recoverPassword(email: string): Observable<null> {
        return this._http.post<null>(`${this._baseUrl}/auth/change-password`, {email: email})
    }
}
