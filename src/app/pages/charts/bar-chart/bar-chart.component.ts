import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Chart} from "chart.js/auto";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit {

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
      type: 'bar',
      data: this.data,
      options: {
        scales: {
          x: {
            ticks: {
              color: '#ffffff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          y: {
            ticks: {
              color: '#ffffff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
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
