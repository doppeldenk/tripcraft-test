import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Property from '../classes/property';
import { PropertyService } from '../services/property.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: Property[];

  constructor(
    private propertyService: PropertyService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProperties();
  }

  getProperties() {
    this.propertyService.getProperties()
      .subscribe((response: any) => {
        this.properties = response.items;
      }, (error) => {
        if (error.status === 401) {
          this.userService.clearUser();
          this.router.navigateByUrl('/login');
        }
      });
  }

  updateProperty(property: Property) {
    this.propertyService.data = property;
    this.router.navigateByUrl(`/properties/edit/${property.id}`);
  }

  goBack() {
    this.router.navigateByUrl('/dashboard');
  }

}
