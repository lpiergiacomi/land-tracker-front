import {IMenuData} from "./helper";

export const navbarData: IMenuData[] = [
  {
    routeLink: 'mapa-de-lotes',
    icon: 'fal fa-home',
    label: 'Lotes',
    items: [
      {
        routeLink: 'mapa-de-lotes',
        label: 'Mapa de lotes',
      }
    ]
  }
];
