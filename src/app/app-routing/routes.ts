import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TenantsComponent } from '../tenants/tenants.component';
import { TenantComponent } from '../tenant/tenant.component';
import { PropertiesComponent } from '../properties/properties.component';
import { PropertyFormComponent } from '../property-form/property-form.component';

export const routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tenants/:id', component: TenantComponent },
  { path: 'tenants', component: TenantsComponent },
  { path: 'properties/new', component: PropertyFormComponent },
  { path: 'properties/edit/:id', component: PropertyFormComponent },
  { path: 'properties', component: PropertiesComponent }
];
