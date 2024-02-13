import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ICustomer } from '../../model/customer';
import { SharedDataService } from '../../services/shared-data-service.service';
import { IUser } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dropdown',
  templateUrl: './customer-dropdown.component.html',
  styleUrls: ['./customer-dropdown.component.css']
})
export class CustomerDropdownComponent {

  constructor(private customerService: CustomerService, private sharedDataService: SharedDataService, private router: Router,) {
    this.sharedDataService.variable$.subscribe(value => {
      value;
      if (value === 'reload') {
        this.findAll();
      }
    });
  }
  username: string | null | undefined;
  customers!: Array<ICustomer>;
  customerName: String | null = "Seleziona il Cliente";
  private subs = new Subscription();
  ngOnInit() {

    let json = localStorage.getItem("login");
    let user: IUser = {
      id: null,
      name: "",
      surname: null,
      username: null,
      password: null,
      logged: false,
      jwt: null,
      rules: undefined
    };
    if (json) {
      user = JSON.parse(json)
    }
    this.username = user.name + " " + user.surname;
    var customerLocalStorage = window.sessionStorage.getItem("customer");
    if (customerLocalStorage) {
      var customerObj = JSON.parse(customerLocalStorage);
      this.customerName = customerObj.customerName;
      this.sharedDataService.updateVariable(customerObj);
    }
    this.findAll();

  }
  changeCustomer(customer: ICustomer) {
    var customerLocalStorage = window.sessionStorage.getItem("customer");
    if (customerLocalStorage) {
      var customerObj = JSON.parse(customerLocalStorage);
      if (customerObj.customerName === customer.customerName) {
        this.customerName = customerObj.customerName;
        this.sharedDataService.updateVariable(customerObj);
      } else {
        this.customerName = customer.customerName;
        this.sharedDataService.updateVariable(customer);
        window.sessionStorage.setItem("customer", JSON.stringify(customer));
      }

    } else {
      this.customerName = customer.customerName;
      this.sharedDataService.updateVariable(customer);
      window.sessionStorage.setItem("customer", JSON.stringify(customer));
    }




  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }
  findAll() {
    this.customerService.getCustomer()
      .subscribe((res) => {

        this.customers = res;
        console.log(this.customers)

      },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
  }
}
