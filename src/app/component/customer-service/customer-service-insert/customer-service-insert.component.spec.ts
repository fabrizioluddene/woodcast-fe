import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceInsertComponent } from './customer-service-insert.component';

describe('CustomerServiceInsertComponent', () => {
  let component: CustomerServiceInsertComponent;
  let fixture: ComponentFixture<CustomerServiceInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerServiceInsertComponent]
    });
    fixture = TestBed.createComponent(CustomerServiceInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
