import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import Tenant from '../classes/tenant';
import { TenantService } from '../services/tenant.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {
  tenant = new Tenant();

  constructor(
    private tenantService: TenantService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private location: Location
) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const tenantId = +params['id'];
      this.getTenant(tenantId);
    });
  }

  getTenant(tenantId: number) {
    this.tenantService.getTenant(tenantId)
      .subscribe((response: any) => {
        this.tenant = response.tenant;
      }, (error) => {
        if (error.status === 401) {
          this.userService.clearUser();
          this.router.navigateByUrl('/login');
        }
      });
  }

  goBack() {
    this.location.back();
  }

}
