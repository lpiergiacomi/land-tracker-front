import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {LoteService} from "../backend/services/lote.service";
import {Lote, LoteParams} from "../backend/model/lote";

@Component({
  selector: 'app-buscador-lotes',
  templateUrl: './buscador-lotes.component.html',
  styleUrls: ['./buscador-lotes.component.css']
})
export class BuscadorLotesComponent implements OnInit{

  estadoLote = new FormControl('');
  estadosLote: string[] = ['Disponible', 'Reservado', 'Vendido'];

  @Output()
  changeLotesEventEmitter = new EventEmitter<Lote[]>();

  lotes: Lote[] = [];

  constructor(private loteService: LoteService) {
  }

  ngOnInit(): void {
  }

  public filtrarLotes(estado: string) {
    this.getLotesFiltrados(estado).subscribe({
      next: (response) => {
        this.lotes = response.content;
        this.changeLotesEventEmitter.emit(this.lotes);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public getLotesFiltrados(estado: string) {
    const params = new LoteParams(
      'Lote',
      1,
      1000000,
      [estado]);
    return this.loteService.getLotesFiltrados(params);
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

}
