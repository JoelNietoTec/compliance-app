import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantTransactionsComponent } from './participant-transactions.component';

describe('ParticipantTransactionsComponent', () => {
  let component: ParticipantTransactionsComponent;
  let fixture: ComponentFixture<ParticipantTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
