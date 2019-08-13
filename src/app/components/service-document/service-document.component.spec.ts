import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDocumentComponent } from './service-document.component';

describe('ServiceDocumentComponent', () => {
  let component: ServiceDocumentComponent;
  let fixture: ComponentFixture<ServiceDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
