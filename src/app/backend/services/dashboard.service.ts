import {Injectable} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {DashboardApi} from "../api/dashboard-api.service";

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
    return await lastValueFrom(this.api.getDashboardCardsInfo(timeScale))
  }

  async getEventsForCalendar(startDate: Date, endDate: Date) {
    return await lastValueFrom(this.api.getEventsForCalendar(startDate, endDate))
  }
}
