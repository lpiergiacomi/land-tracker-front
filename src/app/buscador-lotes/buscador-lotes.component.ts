import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LoteService} from "../backend/services/lote.service";
import {Lote, LoteParams} from "../backend/model/lote";

@Component({
  selector: 'app-buscador-lotes',
  templateUrl: './buscador-lotes.component.html',
  styleUrls: ['./buscador-lotes.component.css']
})
export class BuscadorLotesComponent implements OnInit{

  estadoLote: string[] = [];
  estadosLote: string[] = ['Disponible', 'Reservado', 'Vendido'];

  @Output()
  changeLotesEventEmitter = new EventEmitter<Lote[]>();

  lotes: Lote[] = [];
  formBuscadorLotes: FormGroup;

  constructor(private loteService: LoteService) {
  }

  ngOnInit(): void {
    this.formBuscadorLotes = new FormGroup<any>({
      filtroTextoLote: new FormControl('')
    })
  }

  public filtrarLotes() {
    this.getLotesFiltrados().subscribe({
      next: (response) => {
        this.lotes = response.content;
        this.changeLotesEventEmitter.emit(this.lotes);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public getLotesFiltrados() {
    const params = new LoteParams(
      this.filtroTextoLote.value,
      1,
      1000000,
        this.estadoLote.map(estado => estado.toUpperCase()));
    return this.loteService.getLotesFiltrados(params);
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  get filtroTextoLote() { return this.formBuscadorLotes.get('filtroTextoLote'); }


}
