import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Lote} from "../../../backend/model/lote";

@Component({
  selector: 'app-tooltip-map',
  templateUrl: './tooltip-map.component.html',
  styleUrls: ['./tooltip-map.component.css']
})
export class TooltipMapComponent {

  @Input() lote: Lote;
  @Input() loteSeleccionado: Lote;
  @Input() loteParaTooltip: Lote;

  public mostrarTooltip(){
    return this.loteParaTooltip?.id == this.lote.id;
  }


}
