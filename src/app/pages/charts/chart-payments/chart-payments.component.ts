import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BarChartComponent} from "../bar-chart/bar-chart.component";
import {DashboardService} from "../../../backend/services/dashboard.service";

@Component({
  selector: 'app-chart-payments',
  templateUrl: './chart-payments.component.html',
  styleUrls: ['./chart-payments.component.css']
})
export class ChartPaymentsComponent implements OnChanges {
  data: any;

  @Input()
  timeScale: string

  @ViewChild(BarChartComponent) barChart: BarChartComponent;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateChartData();
  }
  private async updateChartData() {
    this.data = await this.dashboardService.getPaymentsWithTimeScale(this.timeScale);

    const formattedLabels = this.data.map(item => item.label);

    this.data = {
      labels: formattedLabels,
      datasets: [
        {
          label: 'Monto',
          data: this.data.map(item => item.amount),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };

    if (this.barChart) {
      this.barChart.updateChartWithData(this.data);
    }
  }

}

