export class DashboardCard {

  cardsMappingInfo = {
    lotes_reservados_en_el_mes: {
      content: "Lotes reservados en el mes",
      icon: "fal fa-money-check-edit",
      color: "rgb(225 181 48)",
    },
    lotes_con_reserva_abonada_en_el_mes: {
      content: "Lotes con reserva abonada en el mes",
      icon: "fal fa-check",
      color: "rgb(255 144 45)",
    },
    lotes_vendidos_en_el_mes: {
      content: "Lotes vendidos en el mes",
      icon: "fal fa-check-double",
      color: "rgb(255 64 64)",
    }
  }


  guid: string;
  title: number;
  content: string;
  color: string;
  icon: string;

  constructor(guid: string, title: number) {
    this.title = title;
    this.content = this.cardsMappingInfo[guid].content;
    this.icon = this.cardsMappingInfo[guid].icon;
    this.color = this.cardsMappingInfo[guid].color;

  }
}
