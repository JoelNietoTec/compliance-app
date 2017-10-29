import { TestBed, inject } from '@angular/core/testing';

import { ParamValuesService } from './param-values.service';

describe('ParamValuesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParamValuesService]
    });
  });

  it('should be created', inject([ParamValuesService], (service: ParamValuesService) => {
    expect(service).toBeTruthy();
  }));
});
