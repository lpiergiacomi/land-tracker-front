import {IMenuData} from "./helper";

export const navbarData: IMenuData[] = [
  {
    routeLink: 'home/dashboard',
    icon: 'fal fa-analytics',
    label: 'Inicio'
  },
  {
    routeLink: 'lots',
    icon: 'fal fa-home',
    label: 'Lotes',
    items: [
      {
        routeLink: 'lots/map',
        label: 'Mapa de lotes',
      },
      {
        routeLink: 'lots/assignment',
        label: 'Asignación de lotes',
      }
    ]
  },
  {
    routeLink: 'clients',
    icon: 'fal fa-users',
    label: 'Clientes',
    items: [
      {
        routeLink: 'clients/list',
        label: 'Lista de clientes',
      }
    ]
  }
];
