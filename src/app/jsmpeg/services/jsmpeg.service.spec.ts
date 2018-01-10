import { TestBed, inject } from '@angular/core/testing';

import { JsmpegService } from './jsmpeg.service';

describe('JsmpegService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsmpegService]
    });
  });

  it('should be created', inject([JsmpegService], (service: JsmpegService) => {
    expect(service).toBeTruthy();
  }));
});
