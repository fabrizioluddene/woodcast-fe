import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBatchRegistryComponent } from './dashboard-batch-registry.component';

describe('DashboardBatchRegistryComponent', () => {
  let component: DashboardBatchRegistryComponent;
  let fixture: ComponentFixture<DashboardBatchRegistryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardBatchRegistryComponent]
    });
    fixture = TestBed.createComponent(DashboardBatchRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
