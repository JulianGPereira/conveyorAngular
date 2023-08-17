import { TestBed } from '@angular/core/testing';

import { ProductIncrementService } from './product-increment.service';

describe('ProductIncrementService', () => {
  let service: ProductIncrementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductIncrementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
