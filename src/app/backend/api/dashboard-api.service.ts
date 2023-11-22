import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable, of} from "rxjs";

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


  getEventsForCalendar(startDate: Date, endDate: Date) {
    // TODO
    return of([
      {
        title: 'Evento 1',
        start: '2023-11-01',
        color: 'rgb(255 64 64)',
        textColor: 'white'
      },
      {
        title: 'Evento 2',
        start: '2023-11-10',
        end: '2023-11-12'
      }
    ])
  }
}
