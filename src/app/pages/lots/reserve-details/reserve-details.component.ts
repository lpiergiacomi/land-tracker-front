import {Component, Input} from '@angular/core';
import {Lot} from "../../../backend/model/lot";

@Component({
  selector: 'app-reserve-details',
  templateUrl: './reserve-details.component.html',
  styleUrls: ['./reserve-details.component.css']
})
export class ReserveDetailsComponent {
  @Input() lot: Lot;


}
