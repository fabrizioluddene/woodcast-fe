import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BatchRegistryService } from 'src/app/services/batch-registry.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerServiceInsertComponent } from '../../customer-service/customer-service-insert/customer-service-insert.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ICustomer } from 'src/app/model/customer';

@Component({
  selector: 'app-customer-insert',
  templateUrl: './customer-insert.component.html',
  styleUrls: ['./customer-insert.component.css']
})
export class CustomerInsertComponent {
  form = this._formBuilder.group({

    customerName: ['', [Validators.required]],
   
  });
  customer:ICustomer ={
    id: null,
    customerName: null
  }

  constructor(
    private _formBuilder: FormBuilder,
    public customerService: CustomerService,
    private batchRegistryService: BatchRegistryService,
    public dialogRef: MatDialogRef<CustomerServiceInsertComponent>,
    ) {

  }

  sub() {
    if ('INVALID' !== this.form.status ) {
      this.customer.customerName = this.form.controls['customerName'].value;
      this.customerService.save(this.customer).subscribe(res =>{
        this.dialogRef.close();
      })
      
    }else{
      console.log("invalido");
    }
  }
}
