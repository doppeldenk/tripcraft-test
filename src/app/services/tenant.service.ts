import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './user.service';

import Config from '../config';
import Tenant from '../classes/tenant';

const { apiURL } = Config;

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private headers;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    const loggedUser = userService.getUser();
    this.headers = new HttpHeaders({
      'Jwt': loggedUser.accessToken,
      'Username': loggedUser.email,
      'Tenant': '4'
    });
  }

  getTenants(): Observable<Tenant> {
    return this.http.get<Tenant>(`${apiURL.tenant}/tenants`, { headers: this.headers });
  }

  getTenant(tenantId: number): Observable<Tenant> {
    return this.http.get<Tenant>(`${apiURL.tenant}/tenants/${tenantId}`, { headers: this.headers });
  }
}
