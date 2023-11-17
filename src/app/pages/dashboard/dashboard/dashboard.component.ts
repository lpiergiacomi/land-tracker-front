import {Component, OnInit} from '@angular/core';
import {DashboardCard} from "../../../backend/model/dashboard-card";
import {DashboardService} from "../../../backend/services/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  cards: DashboardCard[] = [];
  timeScale: string = 'day';

  constructor(public dashboardService: DashboardService) {
  }

  async ngOnInit(){
    await this.getDashboardCardsInfo();
  }

  getToday() {
    return new Date();
  }

  async setDate(timeScale: string) {
    this.timeScale = timeScale;
    this.cards = [];
    await this.getDashboardCardsInfo();
  }

  private async getDashboardCardsInfo() {
    const response = await this.dashboardService.getDashboardCardsInfo(this.timeScale);
    response.forEach(x => {
      this.cards.push(new DashboardCard(x.guid, x.title))
    })
  }
}
