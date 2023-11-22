export class DashboardCard {

  cardsMappingInfo = {
    reserved_lots: {
      content: "Lotes reservados",
      icon: "fal fa-money-check-edit",
      color: "rgb(225 181 48)",
    },
    lots_with_reserve_paid: {
      content: "Lotes con reserva abonada",
      icon: "fal fa-check",
      color: "rgb(255 144 45)",
    },
    sold_lots: {
      content: "Lotes vendidos",
      icon: "fal fa-check-double",
      color: "rgb(255 64 64)",
    },
    expired_reservations: {
      content: "Reservas vencidas",
      icon: "fal fa-calendar-times",
      color: "rgb(250,24,24)",
    }
  }

  constructor(guid: string, title: number) {
    const { content, icon, color } = this.cardsMappingInfo[guid];
    this.guid = guid;
    this.title = title;
    this.content = content;
    this.icon = icon;
    this.color = color;
    this.initializeContent();
  }

  guid: string;
  title: number;
  content: string;
  color: string;
  icon: string;

  private initializeContent() {
    const defaultContent = this.cardsMappingInfo[this.guid].content;
    const temporalScaleText = {
      day: 'hoy',
      week: 'esta semana',
      month: 'este mes',
      year: 'este año',
    }[this.guid] || 'hoy';

    this.content = temporalScaleText ? `${defaultContent} ${temporalScaleText}` : defaultContent;
  }
  updateContentByTimeScale(timeScale: string) {
    const defaultContent = this.cardsMappingInfo[this.guid].content;
    const scaleText = {
      day: 'hoy',
      week: 'esta semana',
      month: 'este mes',
      year: 'este año',
    }[timeScale] || '';

    this.content = scaleText ? `${defaultContent} ${scaleText}` : defaultContent;
  }
}
