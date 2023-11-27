import { TestBed } from '@angular/core/testing';

import { RestaurantSearchInfoService } from './restaurant-search-info.service';

describe('RestaurantSearchInfoService', () => {
  let service: RestaurantSearchInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantSearchInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
