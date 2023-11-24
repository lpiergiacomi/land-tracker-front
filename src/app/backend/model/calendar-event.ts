export class CalendarEvent {

  constructor(title: string, start: string, reserveId: number, lotId: number) {
    this.title = `Reserva\n${title}`;
    this.start = start;
    this.color = 'rgb(255 64 64)';
    this.textColor = 'white';
    this.reserveId = reserveId;
    this.lotId = lotId;
  }

  title: string;
  start: string;
  color: string;
  textColor: string;
  reserveId: number;
  lotId: number;

}
