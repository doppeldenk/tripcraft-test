import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.getProperties();
  }

  getProperties(): void {
    this.propertyService.getProperties()
      .subscribe((response) => {
        this.properties = response.items;
      }, (error) => {
        if (error.status === 401) {
          this.userService.clearUser();
          this.router.navigateByUrl('/login');
        }
      });
  }

  updateProperty(property: Property) {
    PropertyService.data = property;
    this.router.navigateByUrl(`/properties/edit/${property.id}`);
  }

  goBack(): void {
    this.location.back();
  }

}
