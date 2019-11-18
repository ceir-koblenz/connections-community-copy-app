import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AktivitaetenComponent } from './aktivitaeten.component';

describe('AktivitaetenComponent', () => {
  let component: AktivitaetenComponent;
  let fixture: ComponentFixture<AktivitaetenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AktivitaetenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AktivitaetenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
