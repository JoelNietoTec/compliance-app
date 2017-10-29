import { TestBed, inject } from '@angular/core/testing';

import { ParamSubValuesService } from './param-sub-values.service';

describe('ParamSubValuesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParamSubValuesService]
    });
  });

  it('should be created', inject([ParamSubValuesService], (service: ParamSubValuesService) => {
    expect(service).toBeTruthy();
  }));
});
