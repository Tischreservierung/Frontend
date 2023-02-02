import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantRegistrationComponent } from './restaurant-registration.component';

describe('RestaurantRegistrationComponent', () => {
  let component: RestaurantRegistrationComponent;
  let fixture: ComponentFixture<RestaurantRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
