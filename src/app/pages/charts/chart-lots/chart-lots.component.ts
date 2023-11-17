import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {LotService} from "../../../backend/services/lot.service";
import {BarChartComponent} from "../bar-chart/bar-chart.component";
import {PieChartComponent} from "../pie-chart/pie-chart.component";

@Component({
  selector: 'app-chart-lots',
  templateUrl: './chart-lots.component.html',
  styleUrls: ['./chart-lots.component.css']
})

export class ChartLotsComponent implements OnInit, OnChanges {
  data: any;

  colorByState = {
    'DISPONIBLE': '#28a745',
    'RESERVADO': '#ffc107',
    'VENDIDO': '#dc3545'
  };

  @ViewChild(PieChartComponent) pieChart: PieChartComponent;

  constructor(private lotService: LotService) {
  }

  ngOnInit() {
    this.updateChartData();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateChartData();
  }

  private async updateChartData() {
    this.data = await this.lotService.getLotsQuantityByState();

    const colors = this.data.map(lot => this.getLabelColor(lot.label));
    this.data = {
      labels: this.data.map(lot => lot.label),
      datasets: [{
        label: 'Lotes',
        data: this.data.map(lot => lot.data),
        backgroundColor: colors,
        hoverOffset: 4
      }]
    }

    if (this.pieChart) {
      this.pieChart.updateChartWithData(this.data);
    }
  }

  public getLabelColor(state) {
    return this.colorByState[state];
  }
}

