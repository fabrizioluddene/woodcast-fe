import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerInsertComponent } from './customer-insert/customer-insert.component';
import { ICustomer } from 'src/app/model/customer';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SharedDataService } from 'src/app/services/shared-data-service.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  dataArray: any;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  
  displayedColumns: string[] = ['customerName'];
  constructor(public dialog: MatDialog,private financeService: CustomerService,private sharedDataService: SharedDataService) { }
  dataSource!: MatTableDataSource<ICustomer>;
  openDialog(): void {
    
    const dialogRef = this.dialog.open(CustomerInsertComponent, {
      data: {},
      
      width: '600px',
  
      
    });
    dialogRef.updatePosition({
        top: '80px'    // Set top position
    })

    dialogRef.afterClosed().subscribe(result => {

      this.sharedDataService.updateVariable('reload');
      this.findAll();
      
    });
  }
  ngOnInit() {
    this.findAll();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  findAll(): void {
    this.financeService.getCustomer()
      .subscribe((res) => {
       
   
        this.dataArray = res;
      
        this.dataSource = new MatTableDataSource<ICustomer>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
  }
}
