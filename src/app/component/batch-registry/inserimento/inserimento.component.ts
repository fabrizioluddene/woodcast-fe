import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';



import {

  MAT_DIALOG_DATA,
  MatDialogRef,

} from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { Subscription } from 'rxjs';

import { IBatchRegistry } from 'src/app/model/batch-registry';
import { ICustomer } from 'src/app/model/customer';
import { ICustomerService } from 'src/app/model/customer-service';
import { BatchRegistryService } from 'src/app/services/batch-registry.service';
import { CustomerService } from 'src/app/services/customer.service';
import { SharedDataService } from 'src/app/services/shared-data-service.service';

@Component({
  selector: 'app-inserimento',
  templateUrl: './inserimento.component.html',
  styleUrls: ['./inserimento.component.css'],

})
export class InserimentoComponent {

  private subs = new Subscription();
  custumers!: ICustomer  
  customerServiceModels: ICustomerService[] | undefined;
  batchRegistryModel: IBatchRegistry = {
    id: 0,
    order: null,
    description: null,
    pm: null,
    orderType: null,
    orderStatus: null,
    proceeds: 0,
    note: null,
    proceedsDayPlafond: 0,
    proceedsPlafond: 0,
    daysRemaining: 0,
    proceedsRemaining: 0,
    overallCosts: 0,
    expectedMargin: 0,
    idCustomerService: 0,
    customerService: null,
    expectedMarginEU:0,
    effectiveCosts: 0,
    averageRate:0,
    deltaEffectiveCost:0,
    totalEffectiveDay:0,
    calculateMargin:0,
    effectiveMUP:0

  };
  form = this._formBuilder.group({

    order: ['', [Validators.required]],
    description: ['', [Validators.required]],
    pm: ['', [Validators.required]],
    orderType: ['', [Validators.required]],
    orderStatus: ['', [Validators.required]],
    proceeds: ['', [Validators.required]],
    note: ['', [Validators.required]],
    proceedsDayPlafond: ['', [Validators.required]],
    expectedMargin:['', [Validators.required]],
    idCustomerService: ['', [Validators.required]],
  });
  constructor(
    private _formBuilder: FormBuilder,
    private sharedDataService: SharedDataService,
    public customerService: CustomerService,
    private batchRegistryService: BatchRegistryService,
    public dialogRef: MatDialogRef<InserimentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBatchRegistry,
  ) {
    this.sharedDataService.variable$.subscribe(value => {
      this.custumers = value;

    });
  }
  ngOnInit() {
    this.getCustomerService(this.custumers.id);

  }
  getCustomerService(id: number | null) {
    this.subs.add(this.customerService.getCustomerServices(this.custumers.id)
      .subscribe((res) => {

        this.customerServiceModels = res;
        console.log(this.customerServiceModels);

      },
        (err: HttpErrorResponse) => {
          console.log(err);
        }));
  }
  sub() {
    if ('INVALID' !== this.form.status && this.batchRegistryModel) {
      var idCustomerService: number;
      var proceeds: number;
      var proceedsDayPlafond: number;
      var expectedMargin: number;
      if (this.form.controls['idCustomerService'].value) {
        idCustomerService = +this.form.controls['idCustomerService'].value;
        this.batchRegistryModel.idCustomerService = idCustomerService
      }
      if (this.form.controls['proceeds'].value) {
        proceeds = +this.form.controls['proceeds'].value;
        this.batchRegistryModel.proceeds = proceeds;
      }
      if (this.form.controls['proceeds'].value) {
        proceeds = +this.form.controls['proceeds'].value;
        this.batchRegistryModel.proceeds = proceeds;
      }
      if (this.form.controls['expectedMargin'].value) {
        expectedMargin = +this.form.controls['expectedMargin'].value;
        this.batchRegistryModel.expectedMargin = expectedMargin;
      }
      this.batchRegistryModel.order = this.form.controls['order'].value;
      this.batchRegistryModel.description = this.form.controls['description'].value;
      this.batchRegistryModel.pm = this.form.controls['pm'].value;
      this.batchRegistryModel.orderType = this.form.controls['orderType'].value;
      this.batchRegistryModel.orderStatus = this.form.controls['orderStatus'].value;
      
      this.batchRegistryModel.note = this.form.controls['note'].value;
      



      this.batchRegistryService.save(this.batchRegistryModel).subscribe(result => {
        console.log(result);
        

      })
      this.dialogRef.close();
    } else {
      console.log("invalido");
    }

  }
}
