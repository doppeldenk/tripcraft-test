import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import Property from '../classes/property';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {
  property = new Property();
  loading = false;
  editing = false;

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        const propertyId = +params['id'];
        if (propertyId) {
          this.editing = true;
          this.property = this.propertyService.data;
        }
    });
  }

  onSubmit() {
    this.loading = true;

    if (this.editing) {
      const { id: propertyId } = this.property;
      delete this.property.id;
      this.propertyService.update(this.property, propertyId).subscribe((response) => {
        this.router.navigateByUrl('/properties');
      }, (error) => {
        console.log(error);
      });
    } else {
      this.propertyService.create(this.property).subscribe((response) => {
        this.router.navigateByUrl('/properties');
      }, (error) => {
        console.log(error);
      });
    }
  }

  goBack() {
    this.router.navigateByUrl('/properties');
  }

}
