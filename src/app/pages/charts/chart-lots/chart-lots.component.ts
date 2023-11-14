import {Component, OnInit} from '@angular/core';
import {LotService} from "../../../backend/services/lot.service";

@Component({
  selector: 'app-chart-lots',
  templateUrl: './chart-lots.component.html',
  styleUrls: ['./chart-lots.component.css']
})

export class ChartLotsComponent implements OnInit {
  colorByState = {
    'DISPONIBLE': '#28a745',
    'RESERVADO': '#ffc107',
    'VENDIDO': '#dc3545'
  };

  data: any;

  constructor(private lotService: LotService) {
  }

  async ngOnInit() {
    const lotsQuantityByState = await this.lotService.getLotsQuantityByState();
    const colors = lotsQuantityByState.map(lot => this.getLabelColor(lot.label));
    this.data = {
      labels: lotsQuantityByState.map(lot => lot.label),
      datasets: [{
        label: 'Lotes',
        data: lotsQuantityByState.map(lot => lot.data),
        backgroundColor: colors,
        hoverOffset: 4
      }]
    }

  }
  public getLabelColor(state) {
    return this.colorByState[state];
  }
}

