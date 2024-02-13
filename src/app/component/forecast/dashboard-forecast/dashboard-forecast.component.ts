import { Component, Input, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexAnnotations,
  ApexDataLabels,
  ApexYAxis,
  ApexStroke,
  ApexMarkers,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";
import { ICustomer } from 'src/app/model/customer';
import { ForecastService } from 'src/app/services/forecast.service';
import { SharedDataService } from 'src/app/services/shared-data-service.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: ApexStroke;
  markers: ApexMarkers;
  fill: ApexFill;
  tooltip: ApexTooltip;
  title: ApexTitleSubtitle
};

@Component({
  selector: 'app-dashboard-forecast',
  templateUrl: './dashboard-forecast.component.html',
  styleUrls: ['./dashboard-forecast.component.css']
})
export class DashboardForecastComponent {



  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> ={};
  custumers!: ICustomer;
  data: any;

  constructor(forecastService: ForecastService, private sharedDataService: SharedDataService,) {
    this.sharedDataService.variable$.subscribe(value => {
      this.custumers = value;
      forecastService.getForecastGraph(this.custumers.id, undefined).subscribe(r => {
        this.data = r;
        console.log(this.data);
        this.chartOptions = {
          series: this.data,
          chart: {
            height: 350,
            type: "line"
          },
          stroke: {
            curve: "smooth"
          },
          fill: {
            type: "solid",
            opacity: 0.35,
            
            
          },
          labels: [
            "Gen",
            "feb",
            "mar",
            "apr",
            "mag",
            "giu",
            "lug",
            "ago",
            "set ",
            "ott",
            "nov",
            "dec"
          ],
          markers: {
            size: 0
          },
          yaxis: [
            {
              title: {
                text: "Ricavi Calcolati"
              }
            }
            
            
          ],
          xaxis: {
            labels: {
              trim: false
            }
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + " points";
                }
                return y;
              }
            }
          }
        };
      })
    });
    
    
    
  }



}


