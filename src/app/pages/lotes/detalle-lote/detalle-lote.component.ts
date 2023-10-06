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
export class DetalleLoteComponent implements OnInit {

  @Input() loteSeleccionado: Lote;
  @Output() loteReservadoEvent = new EventEmitter();

  constructor(private loteService: LoteService, public dialogReserva: MatDialog) {

  }
  ngOnInit(): void {
    this.getLoteById(this.loteSeleccionado.id);
  }

  private getLoteById(idLote: number) {
    this.loteService.getLoteById(idLote)
      .subscribe(lote => this.loteSeleccionado = lote);
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

  getStyleBorderByState() {
    let colorClass = 'mat-card-green';
    if (this.loteSeleccionado.estadoLote == 'RESERVADO')
      colorClass = 'mat-card-yellow';
    if (this.loteSeleccionado.estadoLote == 'VENDIDO')
      colorClass = 'mat-card-red';
    return colorClass;
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
