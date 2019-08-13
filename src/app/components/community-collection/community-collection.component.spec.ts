import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCollectionComponent } from './community-collection.component';

describe('CommunityCollectionComponent', () => {
  let component: CommunityCollectionComponent;
  let fixture: ComponentFixture<CommunityCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
