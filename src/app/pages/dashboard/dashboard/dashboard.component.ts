import {Component, OnInit} from '@angular/core';
import {DashboardCard} from "../../../backend/model/dashboard-card";
import {DashboardService} from "../../../backend/services/dashboard.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1000ms ease-in', style({ opacity: 0 })),
      ]),
    ]),

  ],

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
    await this.updateDashboardCardsInfo();
  }

  private async getDashboardCardsInfo() {
    const response = await this.dashboardService.getDashboardCardsInfo(this.timeScale);
    response.forEach(x => {
      this.cards.push(new DashboardCard(x.guid, x.title))
    })
  }

  private async updateDashboardCardsInfo() {
    const response = await this.dashboardService.getDashboardCardsInfo(this.timeScale);

    response.forEach((x, index) => {
      const { guid, title } = x;
      const card = this.cards[index];

      if (card) {
        card.title = title;
        card.updateContentByTimeScale(this.timeScale);
      } else {
        this.cards[index] = new DashboardCard(guid, title);
        this.cards[index].updateContentByTimeScale(this.timeScale);
      }
    });
  }
}
