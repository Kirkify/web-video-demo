import { TestBed, inject } from '@angular/core/testing';

import { NavLinkService } from './nav-link.service';

describe('NavLinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavLinkService]
    });
  });

  it('should be created', inject([NavLinkService], (service: NavLinkService) => {
    expect(service).toBeTruthy();
  }));
});
