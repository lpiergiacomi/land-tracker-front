import {Component, Input, OnInit} from '@angular/core';
import {Lote} from "../backend/model/lote";

@Component({
  selector: 'app-tooltip-map',
  templateUrl: './tooltip-map.component.html',
  styleUrls: ['./tooltip-map.component.css']
})
export class TooltipMapComponent {

  @Input() lote: Lote;
  @Input() loteSeleccionado: Lote;

  cerrarTooltip() {
    this.loteSeleccionado = null;
  }

  public mostrarTooltip(){
    return this.loteSeleccionado?.id == this.lote.id;
  }


}
