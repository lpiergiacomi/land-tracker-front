import { Component, Input } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1000ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class DashboardCardComponent {
  @Input() backgroundColor: string = '#17a2b8';
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() iconClass: string = '';
  @Input() iconFontSize: string = '3.5rem';
}
