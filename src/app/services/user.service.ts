import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import Config from '../config';
import User from '../classes/user';

const { apiURL } = Config;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${apiURL.tenant}/account/sign_in`, user)
      .pipe(
        catchError((e) => {
          console.log('login error', e);
        })
      );
  }

  saveUser(data: {}): void {
    const { email, accessToken } = data;
    localStorage.setItem('email', email);
    localStorage.setItem('accessToken', accessToken);
  }

  getUser(): void {
    return {
      email: localStorage.getItem('email'),
      accessToken: localStorage.getItem('accessToken')
    };
  }

  clearUser(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('accessToken');
  }
}
