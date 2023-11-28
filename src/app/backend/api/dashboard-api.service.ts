import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {map} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {CalendarEvent} from "../model/calendar-event";

@Injectable()
export class DashboardApi {
  private readonly apiController: string = 'dashboard';

  constructor(private api: HttpService) {
  }

  getPaymentsWithTimeScale(timeScale: string) {
    return this.api.get(`${this.apiController}/charts-info/${timeScale}`)
  }

  getDashboardCardsInfo(timeScale: string) {
    return this.api.get(`${this.apiController}/cards-info/${timeScale}`)
  }


  getEventsForCalendar(startDate: Date, endDate: Date, userId: number) {
    const params = new HttpParams()
      .set('startDate', startDate.toString())
      .set('endDate', endDate.toString())
      .set('userId', userId.toString());
    return this.api.get(`${this.apiController}/reserves-for-calendar`, {params}).pipe(
      map(data => data.map(item => this.convertCalendarEvent(item)))
    );
  }

  private convertCalendarEvent(data: any): CalendarEvent {
    return new CalendarEvent(data.title, data.date, data.reserveId, data.lotId);
  }
}
