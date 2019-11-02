import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteApplicationsComponent } from './remote-applications.component';

describe('RemoteApplicationsComponent', () => {
  let component: RemoteApplicationsComponent;
  let fixture: ComponentFixture<RemoteApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
