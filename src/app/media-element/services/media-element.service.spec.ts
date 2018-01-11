import { TestBed, inject } from '@angular/core/testing';

import { MediaElementService } from './media-element.service';

describe('MediaElementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaElementService]
    });
  });

  it('should be created', inject([MediaElementService], (service: MediaElementService) => {
    expect(service).toBeTruthy();
  }));
});
