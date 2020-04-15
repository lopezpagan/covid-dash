
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

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()]
})
export class HomeComponent implements OnInit {
    dailyItems: Array<any> = [];
    allCurrentItems: Array<any> = [];
    allInfoItems: Array<any> = [];
    allDailyItems: Array<any> = [];
    alerts: Array<any> = [];
    curdate: number;
    today: string;

    chartTotalCases: any;
    chartAllPositiveCases: any;
    chartAllIncreasedCases: any;
    chartLetalityAvg: any;

    /* chartTotalCases: any = {
        chartData: [],
        chartLabels: [],
        chartType: '',
    };  */

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
                (items: any) => {
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
                (items: any) => {
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
                (items: any) => {
                    this.allDailyItems = items;
                    this.getChartAllPositiveCases(items);
                    this.getChartAllIncreasedCases(items);
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
                (items: any) => {
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
                (items: any) => {
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


        console.log('dataPos', item.positive);
        console.log('dataDeath', item.death);
        console.log('line', this.chartLetalityAvg);
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

    /**
     * Bar Chart Data: Total de Casos Positivos por Fecha
     */
    getChartAllPositiveCases(items) {
        const item: any = items.map( (i) => items.sort( (a, b) => a.date - b.date) );

        const labels: any = item[0].map( (i) => this.dateFormat( this.convertToDate(i.date), 'MMM dd') );
        const data: any = item[0].map( (i) => i.positive );
        const colors: any = item[0].map( (i) => '#473F93' );
        
        this.chartAllPositiveCases = {
            chartType: 'bar',
            chartLabels: labels,
            chartData:  data,
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
    getChartAllIncreasedCases(items) {
        const item: any = items.map( (i) => items.sort( (a, b) => a.date - b.date) );

        const labels: any = item[0].map( (i) => this.dateFormat( this.convertToDate(i.date), 'MMM dd') );
        const dataPos: any = item[0].map( (i) => i.positiveIncrease );
        const dataDeath: any = item[0].map( (i) => i.deathIncrease ? i.deathIncrease : 0 );
        const dataTests: any = item[0].map( (i) => i.totalTestResultsIncrease );
        
        this.chartAllIncreasedCases = {
            chartType: 'line',
            chartLabels: labels,
            chartData:  [
                {data: dataPos, label: 'AFECTADOS', yAxisID: 'y-axis-1'},
                {data: dataDeath, label: 'FALLECIDOS'},
                {data: dataTests, label: 'PRUEBAS',},
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
                      position: 'left',
                    },
                    {
                      id: 'y-axis-1',
                      position: 'right',
                      gridLines: {
                        color: 'rgba(52, 121, 247, .4)',
                      },
                      ticks: {
                        fontColor: 'rgb(52, 121, 247)',
                      }
                    }
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
