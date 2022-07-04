import { TestBed } from '@angular/core/testing';

import { CsvGeneratorService } from './csv-generator.service';

describe('CsvGeneratorService', () => {
  let service: CsvGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
