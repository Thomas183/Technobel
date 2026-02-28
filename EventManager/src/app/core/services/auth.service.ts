import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FullUser} from '../../shared/models/full-user';
import {BehaviorSubject, Observable} from 'rxjs';
import {RegisterReponse} from '../models/register-reponse';
import {Credentials} from '../models/credentials';
import {LoginSuccessfulResponse} from '../models/login-successful-response';
import {LoginBadResponse} from '../models/login-bad-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = 'https://localhost:7245/api';

  private _isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isLoggedIn$ : Observable<boolean> = this._isLoggedIn.asObservable();

  connectedUser: LoginSuccessfulResponse | undefined;

  constructor(private _httpClient: HttpClient) {
    const loggedIn = !!localStorage.getItem('token');
    this._isLoggedIn.next(loggedIn);
  }

  register(user: FullUser): Observable<null | RegisterReponse> {
    return this._httpClient.post<null | RegisterReponse>(`${this.apiUrl}/Auth/Register`, user);
  }

  login(user: Credentials): void {
    this._httpClient.post<LoginSuccessfulResponse | LoginBadResponse>(`${this.apiUrl}/Auth/Login`, user).subscribe({
      next: user => {
        const response = user as LoginSuccessfulResponse;
        this.connectedUser = response
        localStorage.setItem('token', response.token);
        localStorage.setItem('id', response.member.id.toString());
        this._isLoggedIn.next(true);
      },
      error: error => {
        console.log('Login Failed : ', error);
      }
    });
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.connectedUser = undefined;
    this._isLoggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

}
