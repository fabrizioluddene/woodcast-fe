import { formatCurrency } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ICustomer } from 'src/app/model/customer';
import { IForecast } from 'src/app/model/forecast';
import { ForecastService } from 'src/app/services/forecast.service';
import { SharedDataService } from 'src/app/services/shared-data-service.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  @Input() data: any[] = [];
  originalColumns: string[] = [
    "nominative",
    "area",
    "batchRegistryName",
    "grade",
    "rate",
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobbre",
    "novembre",
    "dicembre"
  ];
  column: any = [
    { name: "Gennaio", value: "gennaio", color: "accent", icon: "visibility" },
    { name: "Febbraio", value: "febbraio", color: "accent", icon: "visibility" },
    { name: "Marzo", value: "marzo", color: "accent", icon: "visibility" },
    { name: "Aprile", value: "aprile", color: "accent", icon: "visibility" },
    { name: "Maggio", value: "maggio", color: "accent", icon: "visibility" },
    { name: "Giugno", value: "giugno", color: "accent", icon: "visibility" },
    { name: "Luglio", value: "luglio", color: "accent", icon: "visibility" },
    { name: "Agosto", value: "agosto", color: "accent", icon: "visibility" },
    { name: "Settembre", value: "settembre", color: "accent", icon: "visibility" },
    { name: "Ottobbre", value: "ottobbre", color: "accent", icon: "visibility" },
    { name: "Novembre", value: "novembre", color: "accent", icon: "visibility" },
    { name: "Dicembre", value: "dicembre", color: "accent", icon: "visibility" },
  ]
  displayedColumns: string[] = this.originalColumns.slice();
  dataSource = new MatTableDataSource<IForecastResponse>();
  dataArray: any;

  private subs = new Subscription();
  custumers!: ICustomer

  constructor(private forcastService: ForecastService, private sharedDataService: SharedDataService) {
    this.sharedDataService.variable$.subscribe(value => {
      this.custumers = value;
      this.getForecast();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  reloadForecast(){
   
    this.getForecast();
  }

  getForecast() {

    this.subs.add(this.forcastService.getForecast(this.custumers.id)
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource<IForecastResponse>(this.transformForecastResponse(res));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
  removeColumn(column: string, index: number) {

    const columnIndex = this.displayedColumns.indexOf(column);
    if (columnIndex !== -1) {
      this.displayedColumns.splice(columnIndex, 1); // Rimuovi la colonna se è presente
    } else {
      const originalIndex = this.originalColumns.indexOf(column);
      if (originalIndex !== -1) {
        this.displayedColumns.splice(originalIndex, 0, column); // Aggiungi la colonna nella posizione originale
      }
    }
    if("visibility" ===this.column[index].icon){
      this.column[index].icon = "visibility_off";
      this.column[index].color = "";
    }else{
      this.column[index].icon = "visibility";
      this.column[index].color = "accent";
    }
    

  }

  ngOnInit() {
    this.getForecast();
  }



  save(elemento: any, inp: any) {
    console.log(elemento)
    this.forcastService.save({ calendarId: elemento, workingDay: inp }).subscribe(res => {
      
    })

  }
  formatCurrency(value: number,) {
    return formatCurrency(value, 'en-US', '€', 'USD', '1.2');
  }

  transformForecastResponse(res: any) {
    var forecastArray = Array<IForecastResponse>();
    res.forEach((obj: { id: number | null; nominative: string | null; company: string | null; area: string | null; batchRegistryName: string | null; number: string | null; grade: string | null; rate: number | null; pivot: { agosto: { idCalendar: number | null; workingDay: number | null; calculatedCost: number | null; calculatedProceeds: number | null; }; settembre: { idCalendar: number | null; workingDay: number | null; calculatedCost: number | null; calculatedProceeds: number | null; }; ottobbre: { idCalendar: number | null; workingDay: number | null; calculatedCost: number | null; calculatedProceeds: number | null; }; giugno: { idCalendar: number | null; workingDay: number | null; calculatedCost: number | null; calculatedProceeds: number | null; }; gennaio: { idCalendar: number | null; workingDay: number | null; calculatedCost: number | null; calculatedProceeds: number | null; }; febbraio: { idCalendar: number | null; workingDay: number | null; calculatedCost: number | null; calculatedProceeds: number | null; }; luglio: { idCalendar: number | null; workingDay: number | null; calculatedCost: number | null; calculatedProceeds: number | null; }; aprile: { idCalendar: number | null; workingDay: number | null; calculatedCost: number | null; calculatedProceeds: number | null; }; dicembre: { idCalendar: number | null; workingDay: number | null; calculatedCost: number | null; calculatedProceeds: number | null; }; novembre: { idCalendar: number | null; workingDay: number | null; calculatedCost: number | null; calculatedProceeds: number | null; }; maggio: { idCalendar: number | null; workingDay: number | null; calculatedCost: number | null; calculatedProceeds: number | null; }; marzo: { idCalendar: number | null; workingDay: number | null; calculatedCost: number | null; calculatedProceeds: number | null; }; }; }) => {
      var forecast: IForecastResponse = {
        id: null,
        nominative: null,
        company: null,
        area: null,
        batchRegistryName: null,
        number: null,
        grade: null,
        rate: null,
        agosto: {
          idCalendar: null,
          workingDay: null,
          calculatedCost: null,
          calculatedProceeds: null
        },
        settembre: {
          idCalendar: null,
          workingDay: null,
          calculatedCost: null,
          calculatedProceeds: null
        },
        ottobbre: {
          idCalendar: null,
          workingDay: null,
          calculatedCost: null,
          calculatedProceeds: null
        },
        giugno: {
          idCalendar: null,
          workingDay: null,
          calculatedCost: null,
          calculatedProceeds: null
        },
        gennaio: {
          idCalendar: null,
          workingDay: null,
          calculatedCost: null,
          calculatedProceeds: null
        },
        febbraio: {
          idCalendar: null,
          workingDay: null,
          calculatedCost: null,
          calculatedProceeds: null
        },
        luglio: {
          idCalendar: null,
          workingDay: null,
          calculatedCost: null,
          calculatedProceeds: null
        },
        aprile: {
          idCalendar: null,
          workingDay: null,
          calculatedCost: null,
          calculatedProceeds: null
        },
        dicembre: {
          idCalendar: null,
          workingDay: null,
          calculatedCost: null,
          calculatedProceeds: null
        },
        novembre: {
          idCalendar: null,
          workingDay: null,
          calculatedCost: null,
          calculatedProceeds: null
        },
        maggio: {
          idCalendar: null,
          workingDay: null,
          calculatedCost: null,
          calculatedProceeds: null
        },
        marzo: {
          idCalendar: null,
          workingDay: null,
          calculatedCost: null,
          calculatedProceeds: null
        }
      }
      forecast.id = obj.id;
      forecast.nominative = obj.nominative;
      forecast.company = obj.company;
      forecast.area = obj.area;
      forecast.batchRegistryName = obj.batchRegistryName;
      forecast.number = obj.number;
      forecast.grade = obj.grade;
      forecast.rate = obj.rate;
      forecast.agosto = obj.pivot.agosto;
      forecast.settembre = obj.pivot.settembre;
      forecast.ottobbre = obj.pivot.ottobbre;
      forecast.giugno = obj.pivot.giugno;
      forecast.gennaio = obj.pivot.gennaio;
      forecast.febbraio = obj.pivot.febbraio;
      forecast.luglio = obj.pivot.luglio;
      forecast.aprile = obj.pivot.aprile;
      forecast.dicembre = obj.pivot.dicembre;
      forecast.novembre = obj.pivot.novembre;
      forecast.maggio = obj.pivot.maggio;
      forecast.marzo = obj.pivot.marzo;

      forecastArray.push(forecast);
    });
    return forecastArray;
  }

}

export interface IForecastResponse {
 
  id: number | null,
  nominative: string | null,
  company: string | null,
  area: string | null,
  batchRegistryName: string | null,
  number: string | null,
  grade: string | null,
  rate: number | null,
  agosto: {
    idCalendar: number | null,
    workingDay: number | null,
    calculatedCost: number | null,
    calculatedProceeds: number | null
  },
  settembre: {
    idCalendar: number | null,
    workingDay: number | null,
    calculatedCost: number | null,
    calculatedProceeds: number | null
  },
  ottobbre: {
    idCalendar: number | null,
    workingDay: number | null,
    calculatedCost: number | null,
    calculatedProceeds: number | null
  },
  giugno: {
    idCalendar: number | null,
    workingDay: number | null,
    calculatedCost: number | null,
    calculatedProceeds: number | null
  },
  gennaio: {
    idCalendar: number | null,
    workingDay: number | null,
    calculatedCost: number | null,
    calculatedProceeds: number | null
  },
  febbraio: {
    idCalendar: number | null,
    workingDay: number | null,
    calculatedCost: number | null,
    calculatedProceeds: number | null
  }
  luglio: {
    idCalendar: number | null,
    workingDay: number | null,
    calculatedCost: number | null,
    calculatedProceeds: number | null
  },
  aprile: {
    idCalendar: number | null,
    workingDay: number | null,
    calculatedCost: number | null,
    calculatedProceeds: number | null
  },
  dicembre: {
    idCalendar: number | null,
    workingDay: number | null,
    calculatedCost: number | null,
    calculatedProceeds: number | null
  },
  novembre: {
    idCalendar: number | null,
    workingDay: number | null,
    calculatedCost: number | null,
    calculatedProceeds: number | null
  },
  maggio: {
    idCalendar: number | null,
    workingDay: number | null,
    calculatedCost: number | null,
    calculatedProceeds: number | null
  },
  marzo: {
    idCalendar: number | null,
    workingDay: number | null,
    calculatedCost: number | null,
    calculatedProceeds: number | null
  }
}
