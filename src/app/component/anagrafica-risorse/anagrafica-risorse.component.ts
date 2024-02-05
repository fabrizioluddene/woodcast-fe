import { Component, Inject, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ResourcesRegistryServiceService } from '../../services/resources-registry-service.service';
import { IResourceRegistry } from "../../model/resource-registry";
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogClose,
} from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnagraficaRisorseInsertComponent } from './anagrafica-risorse-insert/anagrafica-risorse-insert.component';
import { IResourceParam } from 'src/app/model/resource-param';
@Component({
  selector: 'app-anagrafica-risorse',
  templateUrl: './anagrafica-risorse.component.html',
  styleUrls: ['./anagrafica-risorse.component.css']
})

export class AnagraficaRisorseComponent {
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  private subs = new Subscription();

  displayedColumns: string[] = ['nominative', 'company', 'area', 'grade', 'rate', 'number'];

  dataSource!: MatTableDataSource<IResourceRegistry>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  

  private dataArray: any;
  totalElement!: number;
  totalCostAmount!: number;


  constructor(private financeService: ResourcesRegistryServiceService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.subs.add(this.financeService.getRandomUsers()
      .subscribe((res) => {
        this.totalElement = res.totalResources;
        this.totalCostAmount = res.totalCost;
        this.dataArray = res.resources;
        console.log(this.dataArray);
        this.dataSource = new MatTableDataSource<IResourceRegistry>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        (err: HttpErrorResponse) => {
          console.log(err);
        }));
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  public openRecord(id: number, name: string): void {
    this._snackBar.open(`Nominativo: ${id} ${name} `, 'Close', {
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
    const dialogRef = this.dialog.open(AnagraficaRisorseInsertComponent, {
      data: {},

      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
        this.findAll();

      
    });
  }
  findAll(): void {
    this.financeService.getRandomUsers()
      .subscribe((res) => {
        this.totalElement = res.totalResources;
        this.totalCostAmount = res.totalCost;
        this.dataArray = res.resources;
        console.log(this.dataArray);
        this.dataSource = new MatTableDataSource<IResourceRegistry>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
  }

}
