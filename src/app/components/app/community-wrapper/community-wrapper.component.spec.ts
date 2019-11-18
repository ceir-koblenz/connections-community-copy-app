import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityWrapperComponent } from './community-wrapper.component';

describe('CommunityWrapperComponent', () => {
  let component: CommunityWrapperComponent;
  let fixture: ComponentFixture<CommunityWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
