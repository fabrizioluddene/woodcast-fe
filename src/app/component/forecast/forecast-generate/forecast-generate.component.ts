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
  customerServiceModels: ICustomerService[] | undefined;
  custumers!: ICustomer;
  displayedColumns: string[] = ['*', 'nominative', 'grade', 'rate'];
  displayedColumnsAdded: string[] = ['nominative', 'grade', 'rate'];
  private subs = new Subscription();
  private dataArray = new Array();
  selectAll: boolean = false
  private dataToadd = new Array();

  constructor(
    private _formBuilder: FormBuilder,
    private sharedDataService: SharedDataService,
    public customerService: CustomerService,
    private resourcesRegistryServiceService: ResourcesRegistryServiceService,
    private forecastService : ForecastService

  ) {
    this.sharedDataService.variable$.subscribe(value => {
      this.custumers = value;
      this.getCustomerService(this.custumers.id);

    });
  }
  forecastCalendarSave: IForecastCalendarSave | undefined;
  customerServiceId: number | null = 0;
  generaForecast() {
    var pippo = { id: this.customerServiceId }
    var resource = new Array();
    this.dataToadd.forEach((element) => {
      

      resource.push(element)
    })
    this.forecastCalendarSave = {
      resource: resource,
      customerService: {
        id: this.customerServiceId,
        name:  null,
        rate:  null
      }

    }
    this.forecastService.create(this.forecastCalendarSave).subscribe();
    console.log(JSON.stringify(this.forecastCalendarSave));
  }

  addAllChecked() {
    var dataArrayNew = new Array();

    this.dataArray.forEach((item: any, index: any) => {

      if (!item.checked) {

        dataArrayNew.push(item);
      } else {
        this.dataToadd.push(item);

      }
    });
    this.dataArray = dataArrayNew;

    this.dataSource = new MatTableDataSource<IResourceRegistry>(this.dataArray);
    this.dataSourceAddOnservice = new MatTableDataSource<IResourceRegistry>(this.dataToadd);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSourceAddOnservice.paginator = this.paginator;
    this.dataSourceAddOnservice.sort = this.sort;
    this.selectAll = false;
  }
  addElementOnService(arg0: any) {


    this.dataToadd.push(arg0);
    this.dataSourceAddOnservice = new MatTableDataSource<IResourceRegistry>(this.dataToadd);

    this.removeElement(arg0);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource = new MatTableDataSource<IResourceRegistry>(this.dataArray);

  }

  removeElement(arg0: any) {
    console.log("entro")
    this.dataArray.forEach((item: any, index: any) => {
      if (item.nominative === arg0.nominative) {
        this.dataArray.splice(index, 1);
      }
    });
  }
  viewResources(custoomerServiceId: number | null) {
    this.dataToadd = new Array();
    this.dataSourceAddOnservice = new MatTableDataSource<IResourceRegistry>();
    this.customerServiceId = custoomerServiceId
    this.findAllResources();
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAllResources(): void {
    this.resourcesRegistryServiceService.getRandomUsers()
      .subscribe((res) => {

        this.dataArray = res.resources;

        console.log(this.dataArray)

        this.dataSource = new MatTableDataSource<IResourceRegistry>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
