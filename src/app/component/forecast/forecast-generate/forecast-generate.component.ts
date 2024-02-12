import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ICustomer } from 'src/app/model/customer';
import { ICustomerService } from 'src/app/model/customer-service';
import { IForecastCalendarSave } from 'src/app/model/forecast-calendar-save';
import { IResourceRegistry } from 'src/app/model/resource-registry';
import { CustomerService } from 'src/app/services/customer.service';
import { ForecastService } from 'src/app/services/forecast.service';
import { ResourcesRegistryServiceService } from 'src/app/services/resources-registry-service.service';
import { SharedDataService } from 'src/app/services/shared-data-service.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'
import { IBatchRegistry } from 'src/app/model/batch-registry';

@Component({
  selector: 'app-forecast-generate',
  templateUrl: './forecast-generate.component.html',
  styleUrls: ['./forecast-generate.component.css']
})
export class ForecastGenerateComponent {

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  dataSource!: MatTableDataSource<IResourceRegistry>;
  dataSourceAddOnservice!: MatTableDataSource<IResourceRegistry>;
  customerServiceModels: IBatchRegistry[] | undefined;
  custumers!: ICustomer;
  displayedColumns: string[] = ['*', 'nominative', 'grade', 'rate'];
  displayedColumnsAdded: string[] = ['nominative', 'grade', 'rate'];
  private subs = new Subscription();
  private dataArray = new Array();
  selectAll: boolean = false
  
  private dataArrayAddOnservice = new Array();
  private dataTosave = new Array();
  

  constructor(
    private _formBuilder: FormBuilder,
    private sharedDataService: SharedDataService,
    public customerService: CustomerService,
    private resourcesRegistryServiceService: ResourcesRegistryServiceService,
    private forecastService: ForecastService,
    private _snackBar: MatSnackBar

  ) {
    this.sharedDataService.variable$.subscribe(value => {
      this.custumers = value;
      this.getCustomerService(this.custumers.id);

    });
  }
  forecastCalendarSave: IForecastCalendarSave | undefined;
  customerServiceId: number | null = 0;
  generaForecast() {

    var resource = new Array();
    this.dataTosave.forEach((element) => {


      resource.push(element)
    })
    this.forecastCalendarSave = {
      resource: resource,
      customerService: {
        id: this.customerServiceId,
        name: null,
        rate: null
      }

    }
    if(this.dataTosave.length>0){
      this.forecastService.create(this.forecastCalendarSave).subscribe();
      this._snackBar.open('Forecast generato con successo', 'grazie', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }else{
      
      this._snackBar.open('Selezionare almeno un elemento capra!', 'scusa', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
    
  }

  addAllChecked() {
    var dataArrayNew = new Array();

    this.dataArray.forEach((item: any, index: any) => {

      if (!item.checked) {

        dataArrayNew.push(item);
      } else {
        this.dataTosave.push(item);
        this.dataArrayAddOnservice.push(item)
      }
    });
    this.dataArray = dataArrayNew;

    this.dataSource = new MatTableDataSource<IResourceRegistry>(this.dataArray);
    this.dataSourceAddOnservice = new MatTableDataSource<IResourceRegistry>(this.dataArrayAddOnservice);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSourceAddOnservice.paginator = this.paginator;
    this.dataSourceAddOnservice.sort = this.sort;
    this.selectAll = false;
  }
  addElementOnService(arg0: any) {


    this.dataTosave.push(arg0);
    this.dataArrayAddOnservice.push(arg0)
    this.dataSourceAddOnservice = new MatTableDataSource<IResourceRegistry>(this.dataArrayAddOnservice);

    this.removeElement(arg0);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource = new MatTableDataSource<IResourceRegistry>(this.dataArray);

  }

  removeElement(arg0: any) {

    this.dataArray.forEach((item: any, index: any) => {
      if (item.nominative === arg0.nominative) {
        this.dataArray.splice(index, 1);
      }
    });
  }


  toRemove(arg0: any): number | null {
    let indexToReturn: number | undefined;
    for (let index = 0; index < this.dataArray.length; index++) {
      const item = this.dataArray[index];
      if (item.nominative === arg0) {
        indexToReturn = index;
        break; // Interrompe il ciclo una volta trovato l'elemento
      }
    }
    return indexToReturn !== undefined ? indexToReturn : null; // Restituisce l'indice se trovato, altrimenti -1
  }

  viewResources(custoomerServiceId: number | null) {

    
    this.dataSourceAddOnservice = new MatTableDataSource<IResourceRegistry>();
    this.customerServiceId = custoomerServiceId
    this.findAllResources(custoomerServiceId);
  }

  getCustomerService(id: number | null) {
    this.subs.add(this.customerService.getCustomerServices(this.custumers.id)
      .subscribe((res) => {

        this.customerServiceModels = res;
        

      },
        (err: HttpErrorResponse) => {
          console.log(err);
        }));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAllResources(custoomerServiceId: number | null): void {
    this.resourcesRegistryServiceService.findAllResourceCalendar(custoomerServiceId, 'NO_CALENDAR')
      .subscribe((res) => {

        this.dataArray = res.resources;

        this.dataSource = new MatTableDataSource<IResourceRegistry>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.resourcesRegistryServiceService.findAllResourceCalendar(custoomerServiceId, 'CALENDAR')
          .subscribe((res) => {

            this.dataArrayAddOnservice = res.resources;

            this.dataSourceAddOnservice = new MatTableDataSource<IResourceRegistry>(this.dataArrayAddOnservice);
            this.dataSourceAddOnservice.paginator = this.paginator;
            this.dataSourceAddOnservice.sort = this.sort;



          },
            (err: HttpErrorResponse) => {
              console.log(err);
            });


      },
        (err: HttpErrorResponse) => {
          console.log(err);
        });





  }
  setAll(completed: boolean) {

    this.dataArray.forEach((item: any, index: any) => {
      if (completed) {
        this.dataArray[index].checked = true;
      } else {
        this.dataArray[index].checked = false;
      }



    });
    this.dataSource = new MatTableDataSource<IResourceRegistry>(this.dataArray);
  }
}
