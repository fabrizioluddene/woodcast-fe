import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInsertComponent } from './customer-insert.component';

describe('CustomerInsertComponent', () => {
  let component: CustomerInsertComponent;
  let fixture: ComponentFixture<CustomerInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerInsertComponent]
    });
    fixture = TestBed.createComponent(CustomerInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
