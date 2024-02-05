import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDropdownComponent } from './customer-dropdown.component';

describe('CustomerDropdownComponent', () => {
  let component: CustomerDropdownComponent;
  let fixture: ComponentFixture<CustomerDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerDropdownComponent]
    });
    fixture = TestBed.createComponent(CustomerDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
