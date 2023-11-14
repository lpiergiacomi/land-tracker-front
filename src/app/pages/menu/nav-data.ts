import {IMenuData} from "./helper";

export const navbarData: IMenuData[] = [
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
  },
  {
    routeLink: 'charts',

    icon: 'fal fa-chart-bar',
    label: 'Gráficos',
    items: [
      {
        routeLink: 'charts/lots',
        label: 'Gráficos de lotes',
      }
    ]
  },
];
