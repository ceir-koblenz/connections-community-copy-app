import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiChildComponent } from './wiki-child.component';

describe('WikiChildComponent', () => {
  let component: WikiChildComponent;
  let fixture: ComponentFixture<WikiChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
