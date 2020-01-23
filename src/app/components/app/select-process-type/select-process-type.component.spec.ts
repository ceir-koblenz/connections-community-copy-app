import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProcessTypeComponent } from './select-process-type.component';

describe('SelectProcessTypeComponent', () => {
  let component: SelectProcessTypeComponent;
  let fixture: ComponentFixture<SelectProcessTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProcessTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProcessTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
