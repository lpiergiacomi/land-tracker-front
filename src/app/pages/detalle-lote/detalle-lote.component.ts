import {Component, Input, OnInit} from '@angular/core';
import {Lote} from "../../backend/model/lote";
import {LoteService} from "../../backend/services/lote.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogReservaComponent} from "../dialog-reserva/dialog-reserva.component";

@Component({
  selector: 'app-detalle-lote',
  templateUrl: './detalle-lote.component.html',
  styleUrls: ['./detalle-lote.component.css']
})
export class DetalleLoteComponent implements OnInit {

  @Input() loteSeleccionado: Lote;

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
    const dialogRef = this.dialogReserva.open(DialogReservaComponent, {
      data: this.loteSeleccionado,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      //this.animal = result;
    });
  }
}
