import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksParticipantsComponent } from './tasks-participants.component';

describe('TasksParticipantsComponent', () => {
  let component: TasksParticipantsComponent;
  let fixture: ComponentFixture<TasksParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
