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
  displayedColumns: string[] = ["id",
    "nominative",
    "company",
    "area",
    "number",
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
    "ottobbre",
    "settembre",
    "novembre",
    "dicembre"
  ];

  dataSource = new MatTableDataSource<IForecastResponse>();
  dataArray: any;

  private subs = new Subscription();
  custumers!: ICustomer

  constructor(private forcastService: ForecastService, private sharedDataService: SharedDataService) {
    this.sharedDataService.variable$.subscribe(value => {
      this.custumers = value;


    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  ngOnInit() {
   this.getForecast();
    
    

  }



  save(elemento: any, inp: any) {

    

    console.log(elemento)
    this.forcastService.save({  calendarId: elemento,  workingDay: inp  }).subscribe(res=>{
      this.getForecast();
    })

  }

  transformForecastResponse(res: any) {
    var forecastArray = Array<IForecastResponse>();
    res.forEach((obj: { id: number | null; nominative: string | null; company: string | null; area: string | null; number: string | null; grade: string | null; rate: number | null; pivot: { agosto: { idCalendar: number | null; workingDay: number | null; }; settembre: { idCalendar: number | null; workingDay: number | null; }; ottobbre: { idCalendar: number | null; workingDay: number | null; }; giugno: { idCalendar: number | null; workingDay: number | null; }; gennaio: { idCalendar: number | null; workingDay: number | null; }; febbraio: { idCalendar: number | null; workingDay: number | null; }; luglio: { idCalendar: number | null; workingDay: number | null; }; aprile: { idCalendar: number | null; workingDay: number | null; }; dicembre: { idCalendar: number | null; workingDay: number | null; }; novembre: { idCalendar: number | null; workingDay: number | null; }; maggio: { idCalendar: number | null; workingDay: number | null; }; marzo: { idCalendar: number | null; workingDay: number | null; }; }; }) => {
      var forecast: IForecastResponse ={
        id: null,
        nominative: null,
        company: null,
        area: null,
        number: null,
        grade: null,
        rate: null,
        agosto: {
          idCalendar: null,
          workingDay: null
        },
        settembre: {
          idCalendar: null,
          workingDay: null
        },
        ottobbre: {
          idCalendar: null,
          workingDay: null
        },
        giugno: {
          idCalendar: null,
          workingDay: null
        },
        gennaio: {
          idCalendar: null,
          workingDay: null
        },
        febbraio: {
          idCalendar: null,
          workingDay: null
        },
        luglio: {
          idCalendar: null,
          workingDay: null
        },
        aprile: {
          idCalendar: null,
          workingDay: null
        },
        dicembre: {
          idCalendar: null,
          workingDay: null
        },
        novembre: {
          idCalendar: null,
          workingDay: null
        },
        maggio: {
          idCalendar: null,
          workingDay: null
        },
        marzo: {
          idCalendar: null,
          workingDay: null
        }
      }
      forecast.id = obj.id;
      forecast.nominative = obj.nominative;
      forecast.company = obj.company;
      forecast.area = obj.area;
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
  number: string | null,
  grade: string | null,
  rate: number | null,
  agosto: {
    idCalendar: number | null,
    workingDay: number | null,
  },
  settembre: {
    idCalendar: number | null,
    workingDay: number | null,
  },
  ottobbre: {
    idCalendar: number | null,
    workingDay: number | null,
  },
  giugno: {
    idCalendar: number | null,
    workingDay: number | null,
  },
  gennaio: {
    idCalendar: number | null,
    workingDay: number | null,
  },
  febbraio: {
    idCalendar: number | null,
    workingDay: number | null,
  }
  luglio: {
    idCalendar: number | null,
    workingDay: number | null,
  },
  aprile: {
    idCalendar: number | null,
    workingDay: number | null,
  },
  dicembre: {
    idCalendar: number | null,
    workingDay: number | null,
  },
  novembre: {
    idCalendar: number | null,
    workingDay: number | null,
  },
  maggio: {
    idCalendar: number | null,
    workingDay: number | null,
  },
  marzo: {
    idCalendar: number | null,
    workingDay: number | null,
  }


}
