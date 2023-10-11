import {Component, Input } from '@angular/core';
import {Lot} from "../../../backend/model/lot";

@Component({
  selector: 'app-label-lot-number',
  templateUrl: './label-lot-number.component.html',
  styleUrls: ['./label-lot-number.component.css']
})
export class LabelLotNumber {
  @Input() lot: Lot;
  @Input() selectedLot: Lot;
  @Input() tooltipLot: Lot;


}
