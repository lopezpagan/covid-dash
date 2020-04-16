import { environment } from './../../../environments/environment';

import { routerTransition } from '../../router.animations';
import { LoaderService } from './../shared/services/public/loader.service';
import { Component, OnInit } from '@angular/core';
import { 
    DashStateDailySearchService,
    DashStateDailyService,
    DashStateTodayService,
    DashStateInfoService,
    DashStateCurrentService,
} from '../shared/services';
import { take, map, finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


export interface Covid {
    date: number;
    state: string;
    positive: number;
    negative: number;
    pending: number;
    dateChecked: string;
    death: number;
    total: number;
    totalTestResults: number;
    deathIncrease: number;
    hospitalizedIncrease: number;
    negativeIncrease: number;
    positiveIncrease: number;
    totalTestResultsIncrease: number;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()]
})
export class HomeComponent implements OnInit {
    dailyItems: any;
    allCurrentItems: Array<any> = [];
    allInfoItems: Array<any> = [];
    allDailyItems: Array<any> = [];

    allDailyCases: Array<any> = [];

    alerts: Array<any> = [];
    curdate: number;
    today: string;
    year: string;
    letalidad: any;

    chartTotalCases: any;
    chartAllPositiveCases: any;
    chartAllIncreasedCases: any;
    chartAllTotalsByDateCases: any;
    chartLetalityAvg: any;

    version = environment.VERSION;

    constructor(
        private dailySearchService: DashStateDailySearchService,
        private todayService: DashStateTodayService,
        private dailyService: DashStateDailyService,
        private infoService: DashStateInfoService,
        private currentService: DashStateCurrentService,
        private loaderService: LoaderService,
        private datePipe: DatePipe,
    ) {}

    ngOnInit() {
        this.year = this.dateFormat(new Date().toDateString(), 'yyyy');
        this.today = this.dateFormat(new Date().toDateString(), 'yyyy-MM-dd');
        this.getToday();
        this.getDaily();
        // this.getDailySearch('2020-04-01');        
    }

    getToday() {        
        const params = '?state=PR';
        this.todayService.get(params)
            .pipe(
                take(1),
                finalize( () => this.loaderService.hide() )
            )
            .subscribe(
                (items: Covid[]) => {
                    this.dailyItems = items;
                    this.getChartTotalCases(items);
                    this.getChartLetalityAvg(items);
                },
                (err) => console.log(err)
            );
    }

    getDailySearch(date) {
        const curdate = this.dateFormat(date.toDateString());
        
        const params = '?state=PR&date=' + curdate;
        this.dailySearchService.get(params)
            .pipe(
                take(1),
                finalize( () => this.loaderService.hide() )
            )
            .subscribe(
                (items: Covid[]) => {
                    this.dailyItems = items;
                },
                (err) => console.log(err)
            );
    }

    getDaily() {
        const params = '?state=PR';

        this.dailyService.get(params)
            .pipe(
                take(1),
                finalize( () => this.loaderService.hide() )
            )
            .subscribe(
                (items: Covid[]) => {
                    this.allDailyItems = items;
                    this.setAllCases(items);
                },
                (err) => console.log(err)
            );
    }

    getInfo() {
        this.infoService.get()
            .pipe(
                take(1),
                finalize( () => this.loaderService.hide() )
            )
            .subscribe(
                (items: Covid[]) => {
                    this.allInfoItems = items;
                },
                (err) => console.log(err)
            );
    }

    getCurrent() {
        this.currentService.get()
            .pipe(
                take(1),
                finalize( () => this.loaderService.hide() )
            )
            .subscribe(
                (items: Covid[]) => {
                    this.allCurrentItems = items;
                },
                (err) => console.log(err)
            );
    }

    /**
     * Pie Chart Data: Total de Casos
     */
    getChartLetalityAvg(item) {
        
        const pos = ((item.positive - item.death) / item.positive) * 100;
        const death = (item.death / item.positive) * 100;
        this.letalidad = death.toFixed(2);

        this.chartLetalityAvg = {
            chartType: 'pie',
            chartLabels: ['Afectados', 'Fallecidos'],
            chartData:  [pos.toFixed(1), death.toFixed(1)],
            chartColors: [{
                borderColor: ['#FFFFFF', '#FFFFFF'],
                backgroundColor: ['#F4B56A', '#EC6560']
            }],
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    reverse: false,
                    position: 'bottom'
                },
                title: {
                    position: 'top',
                    display: false
                }
            }
        };
    }

    /**
     * Pie Chart Data: Total de Casos
     */
    getChartTotalCases(item) {
        this.chartTotalCases = {
            chartType: 'pie',
            chartLabels: ['Afectados', 'Negativos', 'Pendientes'],
            chartData:  [item.positive, item.negative, item.pending],
            chartColors: [{
                borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
                backgroundColor: ['#F4B56A', '#77D687', '#60B7C9']
            }],
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    reverse: false,
                    position: 'bottom'
                },
                title: {
                    position: 'top',
                    display: false
                }
            }
        };
    }

    setAllCases(items) {
        const item: any = items.map( (i) => items.sort( (a, b) => a.date - b.date) );
        const labels: any = item[0].map( (i) => this.dateFormat( this.convertToDate(i.date), 'MMM dd') );
        const pos: any = item[0].map( (i) => i.positive );
        const death: any = item[0].map( (i) => i.death );
        const tests: any = item[0].map( (i) => i.totalTestResults );
        const colors: any = item[0].map( (i) => '#473F93' );
        
        this.allDailyCases = [{
            labels: labels,
            pos: pos,
            death: death,
            tests: tests,
            colors: colors,
            items: items
        }];

        console.log(this.allDailyCases);

        this.getChartAllPositiveCases();
        this.getChartAllIncreasedCases();
        this.getChartTotalsByDateCases();

    }

    /**
     * Bar Chart Data: Total de Casos Positivos por Fecha
     */
    getChartAllPositiveCases() {  
        const labels = this.allDailyCases[0].labels;
        const pos = this.allDailyCases[0].pos;
        const colors = this.allDailyCases[0].colors;

        this.chartAllPositiveCases = {
            chartType: 'bar',
            chartLabels: labels,
            chartData:  pos,
            chartColors: [{
                borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
                backgroundColor: colors
            }],
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                    reverse: false,
                    position: 'bottom'
                },
                title: {
                    position: 'top',
                    display: false
                }
            }
        };
    }

    /**
     * Line Chart Data: Total de Casos Positivos por Fecha
     */
    getChartAllIncreasedCases() {
        
        const labels = this.allDailyCases[0].labels;
        const pos = this.allDailyCases[0].pos;
        const death = this.allDailyCases[0].death;
        const tests = this.allDailyCases[0].tests;
        
        this.chartAllIncreasedCases = {
            chartType: 'line',
            chartLabels: labels,
            chartData:  [
                {data: pos, label: 'AFECTADOS'},
                {data: death, label: 'FALLECIDOS'},
                {data: tests, label: 'PRUEBAS', yAxisID: 'y-axis-0'},
            ],
            chartColors: [
                {
                    borderColor: 'rgb(244, 181, 106)',
                    backgroundColor: 'rgba(244, 181, 106, .4)'
                },
                {
                    borderColor: 'rgb(236, 101, 96)',
                    backgroundColor: 'rgba(236, 101, 96, .4)'
                },
                {
                    borderColor: 'rgb(52, 121, 247)',
                    backgroundColor: 'rgba(52, 121, 247, .4)'
                },
            ],
            chartLegend: true,
            chartOptions: {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  xAxes: [{}],
                  yAxes: [
                    {
                      id: 'y-axis-0',
                      position: 'right',
                      gridLines: {
                        color: 'rgba(52, 121, 247, .4)',
                      },
                      ticks: {
                        fontColor: 'rgb(52, 121, 247)',
                      }
                    },
                  ]
                },
              }
        };

        console.log(this.chartAllIncreasedCases);
    }

    /**
     * Line Chart Data: Total de Casos Positivos por Fecha
     */
    getChartTotalsByDateCases() {
        
        const labels = this.allDailyCases[0].labels;
        const pos = this.allDailyCases[0].pos;
        const death = this.allDailyCases[0].death;
        const tests = this.allDailyCases[0].tests;
        
        this.chartAllTotalsByDateCases = {
            chartType: 'line',
            chartLabels: labels,
            chartData:  [
                {data: pos, label: 'AFECTADOS'},
                {data: death, label: 'FALLECIDOS'},
                {data: tests, label: 'PRUEBAS', yAxisID: 'y-axis-0'},
            ],
            chartColors: [
                {
                    borderColor: 'rgb(244, 181, 106)',
                    backgroundColor: 'rgba(244, 181, 106, .4)'
                },
                {
                    borderColor: 'rgb(236, 101, 96)',
                    backgroundColor: 'rgba(236, 101, 96, .4)'
                },
                {
                    borderColor: 'rgb(52, 121, 247)',
                    backgroundColor: 'rgba(52, 121, 247, .4)'
                },
            ],
            chartLegend: true,
            chartOptions: {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  xAxes: [{}],
                  yAxes: [
                    {
                      id: 'y-axis-0',
                      position: 'right',
                      gridLines: {
                        color: 'rgba(52, 121, 247, .4)',
                      },
                      ticks: {
                        fontColor: 'rgb(52, 121, 247)',
                      }
                    },
                  ]
                },
              }
        };
    }

    sortArr(arr, dir = 'asc') {
        arr.sort( ( val1, val2) => {
            const d1: any = val1.date;
            const d2: any = val2.date;
            if (dir === 'asc') {
                return d1 - d2;
            } else {
                return d2 - d1;
            }
        });
    }

    convertToDate(param) {
        param = param + '';
        return `${param.substring(0, 4)}-${param.substring(4, 6)}-${param.substring(6, 8)}`;
    }

    dateFormat(date, format = 'yyyyMMdd') {
        return this.datePipe.transform(date, format);
    }

    closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
