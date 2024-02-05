import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ICustomerService } from 'src/app/model/customer-service';
import { BatchRegistryService } from 'src/app/services/batch-registry.service';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { CustomerService } from 'src/app/services/customer.service';
import { SharedDataService } from 'src/app/services/shared-data-service.service';

@Component({
  selector: 'app-customer-service-insert',
  templateUrl: './customer-service-insert.component.html',
  styleUrls: ['./customer-service-insert.component.css']
})


export class CustomerServiceInsertComponent {

  form = this._formBuilder.group({

    name: ['', [Validators.required]],
    rate: ['', [Validators.required]],
   
  });
  iCustomerServiceInsert: ICustomerService ={
    name: null,
    rate: null,
    id: null
  }

  
  constructor(
    private _formBuilder: FormBuilder,

    public customerService: CustomerService,
    public customerServiceService: CustomerServiceService,
    private batchRegistryService: BatchRegistryService,
    public dialogRef: MatDialogRef<CustomerServiceInsertComponent>,
    private sharedDataService: SharedDataService
    ) {
      this.sharedDataService.variable$.subscribe(value => {
        this.customerId = value.id;
        
      });

  }

  customerId: number | null = 0;
  sub() {
    if ('INVALID' !== this.form.status ) {
      this.iCustomerServiceInsert.name =this.form.controls['name'].value;
    
      var rate: number;
      if (this.form.controls['rate'].value) {
        rate =    +this.form.controls['rate'].value;
        this.iCustomerServiceInsert.rate = rate;
      }
      this.customerServiceService.save(this.iCustomerServiceInsert,this.customerId).subscribe(val => {
        this.dialogRef.close();
      });
      
    }else{
      console.log("invalido");
    }
  }

}
