import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chart} from "chart.js/auto";


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnChanges {

  @Input()
  public data: any;
  @Input()
  public chartId: any

  public chart: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.createChart();
    }
  }

  createChart(){

    this.chart = new Chart(this.chartId, {
      type: 'pie',
      data: this.data,
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#ffffff'
            }
          }
        }
      }
    });
  }
}
