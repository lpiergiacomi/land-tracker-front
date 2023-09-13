import {Component, Input, OnInit} from '@angular/core';
import {Lote} from "../backend/model/lote";
import {LoteService} from "../backend/services/lote.service";

@Component({
  selector: 'app-detalle-lote',
  templateUrl: './detalle-lote.component.html',
  styleUrls: ['./detalle-lote.component.css']
})
export class DetalleLoteComponent implements OnInit {

  @Input() loteSeleccionado: Lote;

  constructor(private loteService: LoteService) {

  }
  ngOnInit(): void {
    this.getLoteById(this.loteSeleccionado.id);
  }

  private getLoteById(idLote: number) {
    this.loteService.getLoteById(idLote)
      .subscribe(lote => this.loteSeleccionado = lote);
  }
}
