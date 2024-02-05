import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICustomerService } from 'src/app/model/customer-service';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { CustomerService } from 'src/app/services/customer.service';
import { SharedDataService } from 'src/app/services/shared-data-service.service';
import { CustomerServiceInsertComponent } from './customer-service-insert/customer-service-insert.component';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.css']
})
export class CustomerServiceComponent {
  constructor(public dialog: MatDialog, private customerService: CustomerService, private customerServiceService: CustomerServiceService, private sharedDataService: SharedDataService) {
    this.sharedDataService.variable$.subscribe(value => {
      this.customerId = value.id;
      this.findAll()
    });
  }
  dataArray: any;
  customerId: number | null = 0;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  displayedColumns: string[] = ['name','rate'];
  dataSource!: MatTableDataSource<ICustomerService>;




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(CustomerServiceInsertComponent, {
      data: {},

      width: '600px',


    });
    dialogRef.updatePosition({
      top: '80px'    // Set top position
    })

    dialogRef.afterClosed().subscribe(result => {

      this.findAll();


    });
  }
  findAll(): void {
    this.customerService.getCustomerServices(this.customerId)
      .subscribe((res) => {
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<ICustomerService>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
  }
}
