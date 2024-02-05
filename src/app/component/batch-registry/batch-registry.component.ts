import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ResourcesRegistryServiceService } from '../../services/resources-registry-service.service';
import { IBatchRegistry } from '../../model/batch-registry';
import { BatchRegistryService } from '../../services/batch-registry.service';
import { SharedDataService } from '../../services/shared-data-service.service';
import { ICustomer } from 'src/app/model/customer';
import { InserimentoComponent } from './inserimento/inserimento.component';
import { MatDialog } from '@angular/material/dialog';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-batch-registry',
  templateUrl: './batch-registry.component.html',
  styleUrls: ['./batch-registry.component.css']
})
export class BatchRegistryComponent {
  formatCurrency(value: number,) {
    return formatCurrency(value, 'en-US', '€', 'USD', '1.2');
  }
  private subs = new Subscription();

  displayedColumns: string[] = ['order',
    'description', 'pm', 'orderType',
    'orderStatus', 'proceeds', 'expectedMargin',
    'expectedMarginEU',  'proceedsDayPlafond',
    'proceedsPlafond', 'daysRemaining', 'proceedsRemaining',
    'overallCosts', 'effectiveCosts','averageRate','deltaEffectiveCost','totalEffectiveDay','calculateMargin','effectiveMUP'];

  dataSource!: MatTableDataSource<IBatchRegistry>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  private dataArray: any;
  totalElement!: number;
  totalCostAmount!: number;
  custumers!: ICustomer

  constructor(private financeService: BatchRegistryService, private _snackBar: MatSnackBar, private sharedDataService: SharedDataService, public dialog: MatDialog) {
    this.sharedDataService.variable$.subscribe(value => {
      this.custumers = value;
      if (this.custumers) {
        this.getBatchRegistry(this.custumers.id)
      }
    });
  }
  getBatchRegistry(id: number | null) {
    this.subs.add(this.financeService.getBatchRegistry(this.custumers.id)
      .subscribe((res) => {

        this.dataArray = res;
        console.log(this.dataArray);
        this.dataSource = new MatTableDataSource<IBatchRegistry>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        (err: HttpErrorResponse) => {
          console.log(err);
        }));
  }


  ngOnInit() {


  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  public openRecord(id: number, name: string): void {
    this._snackBar.open(`Record ${id} ${name} `, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(InserimentoComponent, {
      data: {},

      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBatchRegistry(this.custumers.id);

    });
  }

}
