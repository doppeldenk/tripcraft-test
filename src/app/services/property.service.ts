import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './user.service';

import Config from '../config';
import Property from '../classes/property';

const { apiURL } = Config;

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  public data: Property;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    const loggedUser = userService.getUser();
    this.headers = new HttpHeaders({
      'Jwt': loggedUser.accessToken,
      'Username': loggedUser.email,
      'Tenant': '4',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  }


  getProperties(): Observable<Property> {
    return this.http.get<Property>(`${apiURL.property}/properties`, { headers: this.headers })
  }

  create(property: Property): Observable<Property> {
    let body = this.serialize(property);
    return this.http.post<Property>(`${apiURL.property}/properties`, body, { headers: this.headers });
  }

  update(property: Property, propertyId: number): Observable<Property> {
    let body = this.serialize(property);
    return this.http.patch<Property>(`${apiURL.property}/properties/${propertyId}`, body, { headers: this.headers });
  }

  private serialize(data) {
    let body = [];
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        body.push(`${prop}=${data[prop]}`);
      }
    }
    return body.join('&');
  }
}
