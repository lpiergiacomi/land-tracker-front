import {Component, Input, OnInit} from '@angular/core';
import {Lote} from "../backend/model/lote";

@Component({
  selector: 'app-tooltip-map',
  templateUrl: './tooltip-map.component.html',
  styleUrls: ['./tooltip-map.component.css']
})
export class TooltipMapComponent {

  @Input() lote: Lote = new Lote();
  @Input() loteSeleccionado: Lote = new Lote();

  cerrarTooltip() {
    this.loteSeleccionado = new Lote();
  }

  public mostrarTooltip(){
    return this.loteSeleccionado?.id == this.lote.id;
  }


}
