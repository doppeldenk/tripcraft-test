import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Tenant from '../classes/tenant';
import { TenantService } from '../services/tenant.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {
  tenants: Tenant[];

  constructor(
    private tenantService: TenantService,
    private userService: UserService,
    private router: Router
) { }

  ngOnInit() {
    this.getTenants();
  }

  getTenants(): void {
    this.tenantService.getTenants()
      .subscribe((response: any) => {
        this.tenants = response.items;
      }, (error) => {
        if (error.status === 401) {
          this.userService.clearUser();
          this.router.navigateByUrl('/login');
        }
      });
  }

  goBack(): void {
    this.router.navigateByUrl('/dashboard');
  }

}
