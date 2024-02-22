import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MonthDialogComponent } from './month-dialog/month-dialog.component';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ResourcesRegistryServiceService } from 'src/app/services/resources-registry-service.service';
import { IResourceAllocation } from 'src/app/model/resource-allocation';

@Component({
  selector: 'app-resource-balances',
  templateUrl: './resource-balances.component.html',
  styleUrls: ['./resource-balances.component.css']
})
export class ResourceBalancesComponent {
  openDialog(month: number, element: any) {

    this.resourcesService.findByMonthAndResouceId(element.resourceId, month).subscribe((res) => {
      console.log(res);

      const dialogRef = this._bottomSheetRef. open(MonthDialogComponent, {
        data: res,
      });
      

    }, (err: HttpErrorResponse) => {
      console.log(err);
    });

  }

  dataSource!: MatTableDataSource<IResourceAllocation>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  displayedColumns: string[] = [
    "resourceName",
    "january", "januaryWorkableDays","deltaJanuary",
    "february", "februaryWorkableDays",  "deltaFebruary",
    "march", "marchWorkableDays","deltaMarch",
    "april", "aprilWorkableDays","deltaApril",
    "may", "mayWorkableDays","deltaMay",
    "june", "juneWorkableDays","deltaJune",
    "july", "julyWorkableDays", "deltaJuly",
    "august", "augustWorkableDays","deltaAugust",
    "september", "septemberWorkableDays","deltaSeptember",
    "october", "octoberWorkableDays",  "deltaOctober",
    "november", "novemberWorkableDays","deltaNovember",
    "december", "decemberWorkableDays","deltaDecember"
  ];
  displayedColumnsHeader: string[] = [
    "Info",
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settempre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ];

  constructor(private resourcesService: ResourcesRegistryServiceService, public dialog: MatDialog,private _bottomSheetRef: MatBottomSheet) { }

  ngOnInit() {
    this.findAll();
  }

  findAll(): void {
    this.resourcesService.getResourceAllocation().subscribe((res) => {
      this.dataSource = new MatTableDataSource<IResourceAllocation>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  linkPresent(column: string): boolean {

    if (column.toString().includes('WorkableDays') || column.toString().includes('resourceName')) {
      return false;
    } else {
      return true;
    }

  }
  getStyleClass(column: string, element: any): any {
    if (column.toString().startsWith('january')) {
      return this.getColorClass(element["stopLJanuary"]);
    } else if (column.toString().startsWith('february')) {
      return this.getColorClass(element["stopLFebruary"]);
    } else if (column.toString().startsWith('march')) {
      return this.getColorClass(element["stopLMarch"]);
    } else if (column.toString().startsWith('april')) {
      return this.getColorClass(element["stopLApril"]);
    } else if (column.toString().startsWith('may')) {
      return this.getColorClass(element["stopLMay"]);
    } else if (column.toString().startsWith('june')) {
      return this.getColorClass(element["stopLJune"]);
    } else if (column.toString().startsWith('july')) {
      return this.getColorClass(element["stopLJuly"]);
    } else if (column.toString().startsWith('august')) {
      return this.getColorClass(element["stopLAugust"]);
    } else if (column.toString().startsWith('september')) {
      return this.getColorClass(element["stopLSeptember"]);
    } else if (column.toString().startsWith('october')) {
      return this.getColorClass(element["stopLOctober"]);
    } else if (column.toString().startsWith('november')) {
      return this.getColorClass(element["stopLNovember"]);
    } else if (column.toString().startsWith('december')) {
      return this.getColorClass(element["stopLDecember"]);
    }
    return '';
  }

  getColName(col: string): any {
    if (col.toString().includes('WorkableDays')) {
      return 'GG MESE'
    } else if (col.toString().includes('resourceName')) {
      return 'Nominativo'
    }
    else {
      return 'GG FORE.'
    }
  }


  getColorClass(stopValue: string): string {
    switch (stopValue) {
      case 'YELLOW':
        return "color-yellow";
      case 'GREEN':
        return "color-green";
      case 'RED':
        return "color-red";
      default:
        return '';
    }
  }

  monthToNumber(month: string): number | null {
    const monthLowercase = month.toLowerCase();
    switch (monthLowercase) {
      case "january":
        return 1;
      case "february":
        return 2;
      case "march":
        return 3;
      case "april":
        return 4;
      case "may":
        return 5;
      case "june":
        return 6;
      case "july":
        return 7;
      case "august":
        return 8;
      case "september":
        return 9;
      case "october":
        return 10;
      case "november":
        return 11;
      case "december":
        return 12;
      default:
        return null;
    }
  }
}
