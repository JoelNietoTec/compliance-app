import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardsListComponent } from './discards-list.component';

describe('DiscardsListComponent', () => {
  let component: DiscardsListComponent;
  let fixture: ComponentFixture<DiscardsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscardsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
