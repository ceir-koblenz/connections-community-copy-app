import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { membersComponent } from './members.component';

describe('MembersComponent', () => {
  let component: membersComponent;
  let fixture: ComponentFixture<membersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ membersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(membersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
