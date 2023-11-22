import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Chart} from "chart.js/auto";


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements AfterViewInit {

  @Input()
  public data: any;

  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;

  public chart: any;

  ngAfterViewInit() {
    this.createChart();
  }

  createChart(){
    if (this.chart) {
      this.chart.destroy();
    }
    const ctx = this.chartCanvas?.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
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

  updateChartWithData(newData: any) {
    if (this.chart) {
      this.chart.data = newData;
      this.chart.update();
    }
  }
}
