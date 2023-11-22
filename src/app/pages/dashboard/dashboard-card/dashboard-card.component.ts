import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent {
  @Input() backgroundColor: string = '#17a2b8';
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() iconClass: string = '';
  @Input() iconFontSize: string = '3.5rem';
}
