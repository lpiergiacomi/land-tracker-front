import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Lote} from "../backend/model/lote";

@Component({
  selector: 'app-label-nro-lote',
  templateUrl: './label-nro-lote.component.html',
  styleUrls: ['./label-nro-lote.component.css']
})
export class LabelNroLoteComponent {
  @Input() lote: Lote;
  @Input() loteSeleccionado: Lote;
  @Output() cerrarTooltipEvent = new EventEmitter<void>();

  cerrarTooltipDesdeHijo() {
    this.loteSeleccionado = null;
    this.cerrarTooltipEvent.emit();
  }

}
