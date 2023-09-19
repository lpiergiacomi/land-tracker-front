import {Component, Input } from '@angular/core';
import {Lote} from "../../backend/model/lote";

@Component({
  selector: 'app-label-nro-lote',
  templateUrl: './label-nro-lote.component.html',
  styleUrls: ['./label-nro-lote.component.css']
})
export class LabelNroLoteComponent {
  @Input() lote: Lote;
  @Input() loteSeleccionado: Lote;
  @Input() loteParaTooltip: Lote;


}
