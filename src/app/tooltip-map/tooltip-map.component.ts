import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Lote} from "../backend/model/lote";

@Component({
  selector: 'app-tooltip-map',
  templateUrl: './tooltip-map.component.html',
  styleUrls: ['./tooltip-map.component.css']
})
export class TooltipMapComponent {

  @Input() lote: Lote;
  @Input() loteSeleccionado: Lote;
  @Input() loteParaTooltip: Lote;
  @Output() cerrarTooltipEvent = new EventEmitter<void>(); //TODO: Por ahora no se usa

  public mostrarTooltip(){
    return this.loteParaTooltip?.id == this.lote.id;
  }


}
