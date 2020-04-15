import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
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
