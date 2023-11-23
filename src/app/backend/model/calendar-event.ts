export class CalendarEvent {

  constructor(title: string, start: string, reserveId: number) {
    this.title = `Reserva de ${title}`;
    this.start = start;
    this.color = 'rgb(255 64 64)';
    this.textColor = 'white';
    this.reserveId = reserveId;
  }

  title: string;
  start: string;
  color: string;
  textColor: string;
  reserveId: number;

}
