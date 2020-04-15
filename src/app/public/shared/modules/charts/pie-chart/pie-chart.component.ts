import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() chart: any;

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }
  
  public chartHovered(e: any): void {
    // console.log(e);
  }
  

  constructor() { }

  ngOnInit() {
      console.log('chart', this.chart);
  }


}
