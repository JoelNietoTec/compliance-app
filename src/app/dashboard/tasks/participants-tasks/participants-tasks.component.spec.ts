import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsTasksComponent } from './participants-tasks.component';

describe('ParticipantsTasksComponent', () => {
  let component: ParticipantsTasksComponent;
  let fixture: ComponentFixture<ParticipantsTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
