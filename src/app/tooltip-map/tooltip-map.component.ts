import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lote} from "../backend/model/lote";

@Component({
  selector: 'app-tooltip-map',
  templateUrl: './tooltip-map.component.html',
  styleUrls: ['./tooltip-map.component.css']
})
export class TooltipMapComponent {

  @Input() lote: Lote;
  @Input() loteSeleccionado: Lote;
  @Output() cerrarTooltipEvent = new EventEmitter<void>();

  cerrarTooltip() {
    this.cerrarTooltipEvent.emit();
  }

  public mostrarTooltip(){
    return this.loteSeleccionado?.id == this.lote.id;
  }


}
