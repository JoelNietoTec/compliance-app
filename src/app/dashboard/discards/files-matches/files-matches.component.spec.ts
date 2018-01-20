import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesMatchesComponent } from './files-matches.component';

describe('FilesMatchesComponent', () => {
  let component: FilesMatchesComponent;
  let fixture: ComponentFixture<FilesMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
