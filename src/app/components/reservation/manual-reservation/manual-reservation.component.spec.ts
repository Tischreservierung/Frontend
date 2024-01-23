import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualReservationComponent } from './manual-reservation.component';

describe('ManualReservationComponent', () => {
  let component: ManualReservationComponent;
  let fixture: ComponentFixture<ManualReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
