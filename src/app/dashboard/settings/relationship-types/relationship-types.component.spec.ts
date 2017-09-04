import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipTypesComponent } from './relationship-types.component';

describe('RelationshipTypesComponent', () => {
  let component: RelationshipTypesComponent;
  let fixture: ComponentFixture<RelationshipTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
