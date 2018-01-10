import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsmpegComponent } from './jsmpeg.component';

describe('JsmpegComponent', () => {
  let component: JsmpegComponent;
  let fixture: ComponentFixture<JsmpegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsmpegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsmpegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
