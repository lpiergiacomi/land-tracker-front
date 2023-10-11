import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lote} from "../../../backend/model/lote";
import {LoteService} from "../../../backend/services/lote.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogReservaComponent} from "../dialog-reserva/dialog-reserva.component";

@Component({
  selector: 'app-detalle-lote',
  templateUrl: './detalle-lote.component.html',
  styleUrls: ['./detalle-lote.component.css']
})
export class DetalleLoteComponent {

  @Input() loteSeleccionado: Lote;
  @Output() loteReservadoEvent = new EventEmitter();

  constructor(private loteService: LoteService, public dialogReserva: MatDialog) {

  }

  reservar() {
    const dialogReserva = this.dialogReserva.open(DialogReservaComponent, {
      data: this.loteSeleccionado,
    });

    dialogReserva.afterClosed().subscribe(reserva => {
      if (reserva) {
        this.loteSeleccionado.estadoLote = 'RESERVADO';
        this.loteReservadoEvent.emit();
      }
    });
  }

  getColorState() {
    let color = '#7bb95dab';
    if (this.loteSeleccionado.estadoLote == 'RESERVADO')
      color = '#ffed4887';
    if (this.loteSeleccionado.estadoLote == 'VENDIDO')
      color = '#ff000096';
    return color;
  }
}
