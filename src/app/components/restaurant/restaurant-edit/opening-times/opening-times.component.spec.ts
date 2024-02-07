import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningTimesComponent } from './opening-times.component';

describe('OpeningTimesComponent', () => {
  let component: OpeningTimesComponent;
  let fixture: ComponentFixture<OpeningTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningTimesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeningTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
