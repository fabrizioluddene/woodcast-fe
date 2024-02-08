import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardForecastComponent } from './dashboard-forecast.component';

describe('DashboardForecastComponent', () => {
  let component: DashboardForecastComponent;
  let fixture: ComponentFixture<DashboardForecastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardForecastComponent]
    });
    fixture = TestBed.createComponent(DashboardForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
