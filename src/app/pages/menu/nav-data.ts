import {IMenuData} from "./helper";

export const navbarData: IMenuData[] = [
  {
    routeLink: 'lotes',
    icon: 'fal fa-home',
    label: 'Lotes',
    items: [
      {
        routeLink: 'lotes/mapa',
        label: 'Mapa de lotes',
      },
      {
        routeLink: 'lotes/listado',
        label: 'Lista de lotes',
      }
    ]
  },
  {
    routeLink: 'clientes',
    icon: 'fal fa-users',
    label: 'Clientes',
    items: [
      {
        routeLink: 'clientes/listado',
        label: 'Lista de clientes',
      }
    ]
  },
  {
    routeLink: 'reservas',
    icon: 'fal fa-calendar-check',
    label: 'Reservas',
    items: [
      {
        routeLink: 'reservas/listado',
        label: 'Lista de reservas',
      }
    ]
  }
];
