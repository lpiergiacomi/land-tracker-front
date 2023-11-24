import {Component, ViewChild} from '@angular/core';
import {CalendarOptions, EventApi} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import {DashboardService} from "../../backend/services/dashboard.service";
import esLocale from '@fullcalendar/core/locales/es';
import {ReserveService} from "../../backend/services/reserve.service";
import {ToastrService} from "ngx-toastr";
import {FullCalendarComponent} from "@fullcalendar/angular";
import {MatDialog} from "@angular/material/dialog";
import {LotService} from "../../backend/services/lot.service";
import {ReserveDetailsDialogComponent} from "../lots/reserve-details-dialog/reserve-details-dialog.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @ViewChild('fullCalendar') fullCalendar!: FullCalendarComponent;

  constructor(private dashboardService: DashboardService,
              private reserveService: ReserveService,
              private lotService: LotService,
              private toastr: ToastrService,
              public matDialog: MatDialog) {}

  handleDatesSet(arg: { start: Date; end: Date; }) {
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
    eventClick: this.handleEventClick.bind(this),
    locale: esLocale,
    buttonText: {
      today: 'Hoy',
    },
    datesSet: this.handleDatesSet.bind(this),
    eventContent: this.customEventContent.bind(this)
  };


  async handleEventDrop(eventDropInfo: { event: EventApi }) {
    try {
      await this.reserveService.updateDueDate(eventDropInfo.event.extendedProps['reserveId'], eventDropInfo.event.start);
      this.toastr.success(`Fecha de reserva actualizada correctamente`);
    } catch (error) {
      this.fullCalendar.getApi().destroy();
      this.fullCalendar.getApi().render();
      console.error(error);
      this.toastr.error(error?.error?.message);
    }
  }

  handleEventClick(eventClickInfo: { event: EventApi }) {
    this.openDialogMoreInfo(eventClickInfo.event.extendedProps['lotId']);
  }

  async openDialogMoreInfo(lotId) {
    const lot = await this.lotService.getLotById(lotId);
    this.matDialog.open(ReserveDetailsDialogComponent, {
      data: lot,
      width: '40rem'
    });
  }

  customEventContent(arg) {
    const eventTitle = arg.event.title;
    const titleHtml = eventTitle.split('\n').join('<br>');
    return { html: `<div>${titleHtml}</div>` };
  }
}
