export interface IMenuData {
    routeLink: string;
    icon?: string;
    label: string;
    expanded?: boolean;
    items?: IMenuData[];
}
