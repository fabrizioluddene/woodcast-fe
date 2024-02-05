import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastGenerateComponent } from './forecast-generate.component';

describe('ForecastGenerateComponent', () => {
  let component: ForecastGenerateComponent;
  let fixture: ComponentFixture<ForecastGenerateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForecastGenerateComponent]
    });
    fixture = TestBed.createComponent(ForecastGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
