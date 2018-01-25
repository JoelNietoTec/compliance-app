import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantSanctionsComponent } from './participant-sanctions.component';

describe('ParticipantSanctionsComponent', () => {
  let component: ParticipantSanctionsComponent;
  let fixture: ComponentFixture<ParticipantSanctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantSanctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantSanctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
