import { Component, Inject, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ResourcesRegistryServiceService } from '../../../services/resources-registry-service.service';
import { IResourceRegistry } from "../../../model/resource-registry";
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogClose,
} from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedDataService } from 'src/app/services/shared-data-service.service';
import { IResourceParam } from 'src/app/model/resource-param';

@Component({
  selector: 'app-anagrafica-risorse-insert',
  templateUrl: './anagrafica-risorse-insert.component.html',
  styleUrls: ['./anagrafica-risorse-insert.component.css']
})


export class AnagraficaRisorseInsertComponent {

  customerRateParams!: Array<IResourceParam>;

  constructor(
    private _formBuilder: FormBuilder,
    private sharedDataService: SharedDataService,
    public dialogRef: MatDialogRef<AnagraficaRisorseInsertComponent>, private resourceRegistry: ResourcesRegistryServiceService,
    private resourcesRegistryServiceService: ResourcesRegistryServiceService

  ) { }

  

  ngOnInit() {
    this.resourcesRegistryServiceService.getAllParamResource()
      .subscribe((res) => {
        this.customerRateParams = res;

      },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
  }

  resource: IResource = {
    id: null,
    nominative: null,
    company: null,
    area: null,
    number: null,
    grade: null,
    rate: null
  }

  form = this._formBuilder.group({


    nominative: ['', [Validators.required]],
    company: ['', [Validators.required]],
    area: ['', [Validators.required]],
    number: ['', [Validators.required]],
    grade: ['', [Validators.required]],

  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  sub() {
    var rate: number;

    if ('INVALID' !== this.form.status) {
      this.resource.nominative = this.form.controls['nominative'].value;
      this.resource.company = this.form.controls['company'].value;
      this.resource.area = this.form.controls['area'].value;
      this.resource.number = this.form.controls['number'].value;
      this.resource.grade = this.form.controls['grade'].value;



      this.resourceRegistry.save(this.resource).subscribe(result => {

        this.dialogRef.close();


      });
      console.log("valido")
    } else {
      console.log("invalido")
    }
  }
}

export interface IResource {

  id: number | null,
  nominative: string | null,
  company: string | null,
  area: string | null,
  number: string | null,
  grade: string | null,
  rate: number | null


}