import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import User from '../classes/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  loading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    const user = this.userService.getUser();
    if (user.accessToken) this.router.navigateByUrl('/dashboard');
  }

  onSubmit(): void {
    this.loading = true;

    this.user = {...this.user, subdomain: 'tripcraft'};
    this.userService.login(this.user).subscribe((response) => {
      this.userService.saveUser({
        email: this.user.email,
        accessToken: response.access_token
      });
      this.router.navigateByUrl('/tenants');
    });
  }

}
