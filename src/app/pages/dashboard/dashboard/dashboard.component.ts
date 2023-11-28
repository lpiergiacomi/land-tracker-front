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
    await this.getDashboardCardsInfo();
  }

  private async getDashboardCardsInfo() {
    const cardsInfo = await this.dashboardService.getDashboardCardsInfo(this.timeScale);

    cardsInfo.forEach((cardInfo, index) => {
      const { guid, title } = cardInfo;

      const card = this.cards[index];

      if (card) {
        card.title = title;
        card.timeScale = this.timeScale;
        card.updateContentByTimeScale();
      } else {
        this.cards[index] = new DashboardCard(guid, title, this.timeScale);
        this.cards[index].updateContentByTimeScale();
      }
    });
  }

  private async updateDashboardCardsInfo() {
    const cardsInfo = await this.dashboardService.getDashboardCardsInfo(this.timeScale);

    cardsInfo.forEach((cardInfo, index) => {
      const card = this.cards[index];

      card.title = cardInfo.title;
      card.updateContentByTimeScale();

    });
  }

}
