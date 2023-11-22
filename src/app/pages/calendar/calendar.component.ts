import {Component} from '@angular/core';
import {CalendarOptions, EventApi} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import {DashboardService} from "../../backend/services/dashboard.service";
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  constructor(private dashboardService: DashboardService) {}

  handleDatesSet(arg: { start: Date; end: Date; }) {
    console.log('cambia las fechas visibles')
    this.loadEvents(arg.start, arg.end);
  }

  async loadEvents(startDate: Date, endDate: Date) {
    this.calendarOptions.events = await this.dashboardService.getEventsForCalendar(startDate, endDate);
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    editable: true,
    eventResizableFromStart: false,
    eventDurationEditable: false,
    eventDrop: this.handleEventDrop.bind(this),
    locale: esLocale,
    buttonText: {
      today: 'Hoy',
    },
    datesSet: this.handleDatesSet.bind(this)
  };


  handleEventDrop(eventDropInfo: { event: EventApi }) {
    // TODO
    const updatedEvent = {
      id: eventDropInfo.event.id,
      start: eventDropInfo.event.start,
      end: eventDropInfo.event.end,
      allDay: eventDropInfo.event.allDay
    };

    console.log(updatedEvent)
  };
}
