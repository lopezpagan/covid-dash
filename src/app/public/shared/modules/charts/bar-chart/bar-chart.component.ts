import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() chart: any;
  
  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }
  
  public chartHovered(e: any): void {
    // console.log(e);
  }
  constructor() { }

  ngOnInit() {}

}
