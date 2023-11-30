import {Injectable} from '@angular/core';
import {lastValueFrom, map} from "rxjs";
import {DashboardApi} from "../api/dashboard-api.service";
import {DashboardCard} from "../model/dashboard-card";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private api: DashboardApi) {
  }

  async getPaymentsWithTimeScale(timeScale: string) {
    return await lastValueFrom(this.api.getPaymentsWithTimeScale(timeScale));
  }

  async getDashboardCardsInfo(timeScale: string) {
    return await lastValueFrom(this.api.getDashboardCardsInfo(timeScale).pipe(
      map(data => data.map(item => this.convertToDashboardCard(item, timeScale)))
    ));
  }

  async getEventsForCalendar(startDate: Date, endDate: Date, userId: number) {
    return await lastValueFrom(this.api.getEventsForCalendar(startDate, endDate, userId))
  }

  private convertToDashboardCard(item: any, timeScale: any): DashboardCard {
    return new DashboardCard(item.guid, item.title, timeScale);
  }
}
