import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantTasksComponent } from './participant-tasks.component';

describe('ParticipantTasksComponent', () => {
  let component: ParticipantTasksComponent;
  let fixture: ComponentFixture<ParticipantTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
