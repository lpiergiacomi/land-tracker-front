import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LoteService} from "../../../backend/services/lote.service";
import {Lote, LoteParams} from "../../../backend/model/lote";

@Component({
  selector: 'app-buscador-lotes',
  templateUrl: './buscador-lotes.component.html',
  styleUrls: ['./buscador-lotes.component.css']
})
export class BuscadorLotesComponent implements OnInit {

  estadoLote = new FormControl('');
  estadosLote: string[] = ['Disponible', 'Reservado', 'Vendido'];

  @Output()
  changeLotesEventEmitter = new EventEmitter<Lote[]>();

  lotes: Lote[] = [];
  formBuscadorLotes: FormGroup;
  panelOpenState = true;

  constructor(private loteService: LoteService) {
  }

  ngOnInit(): void {
    this.formBuscadorLotes = new FormGroup<any>({
      filtroTextoLote: new FormControl('', {nonNullable: true}),
      filtroEstadosLote: new FormControl([], {nonNullable: true})
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
      null,
      null,
      this.filtroEstadosLote.value.map(estado => estado.toUpperCase()));
    return this.loteService.getLotesFiltrados(params);
  }

  get filtroTextoLote() {
    return this.formBuscadorLotes.get('filtroTextoLote');
  }

  get filtroEstadosLote() {
    return this.formBuscadorLotes.get('filtroEstadosLote');
  }


  limpiarFiltros() {
    this.formBuscadorLotes.reset();
    this.filtrarLotes();
  }
}
