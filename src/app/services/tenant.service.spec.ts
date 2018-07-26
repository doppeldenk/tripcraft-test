import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TenantService } from './tenant.service';

describe('TenantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenantService],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([TenantService], (service: TenantService) => {
    expect(service).toBeTruthy();
  }));
});
