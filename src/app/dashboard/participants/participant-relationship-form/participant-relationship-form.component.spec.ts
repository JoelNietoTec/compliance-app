import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantRelationshipFormComponent } from './participant-relationship-form.component';

describe('ParticipantRelationshipFormComponent', () => {
  let component: ParticipantRelationshipFormComponent;
  let fixture: ComponentFixture<ParticipantRelationshipFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantRelationshipFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantRelationshipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
