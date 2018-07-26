import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { routes } from './app-routing/routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { TenantsComponent } from './tenants/tenants.component';
import { TenantComponent } from './tenant/tenant.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyFormComponent } from './property-form/property-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const moduleConfig = {
  declarations: [
    AppComponent,
    LoginComponent,
    TenantsComponent,
    TenantComponent,
    PropertiesComponent,
    PropertyFormComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
};
