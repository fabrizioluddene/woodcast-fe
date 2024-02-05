import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchRegistryComponent } from './batch-registry.component';

describe('BatchRegistryComponent', () => {
  let component: BatchRegistryComponent;
  let fixture: ComponentFixture<BatchRegistryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BatchRegistryComponent]
    });
    fixture = TestBed.createComponent(BatchRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
