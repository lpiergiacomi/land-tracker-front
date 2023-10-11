import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Lot} from "../../../backend/model/lot";

@Component({
  selector: 'app-tooltip-map',
  templateUrl: './tooltip-map.component.html',
  styleUrls: ['./tooltip-map.component.css']
})
export class TooltipMapComponent {

  @Input() lot: Lot;
  @Input() selectedLot: Lot;
  @Input() tooltipLot: Lot;

  public mostrarTooltip(){
    return this.tooltipLot?.id == this.lot.id;
  }


}
