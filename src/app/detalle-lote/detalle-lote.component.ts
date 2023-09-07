import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Lote} from "../backend/model/lote";
import {LoteService} from "../backend/services/lote.service";

@Component({
  selector: 'app-detalle-lote',
  templateUrl: './detalle-lote.component.html',
  styleUrls: ['./detalle-lote.component.css']
})
export class DetalleLoteComponent implements OnInit{
  public lote: Lote;

  constructor(private route: ActivatedRoute, private loteService: LoteService) {

  }
  ngOnInit(): void {
    const idLote = this.route.snapshot.params['id'];
    this.lote = this.getLoteById(idLote);
  }

  private getLoteById(idLote: number) {
    /*
    this.loteService.getLoteById(idLote)
      .subscribe(lote => console.log(lote));
    */

    return new Lote(idLote, 'Lote 1', 500, 'DISPONIBLE', null, 20, 25, "001-001-001", "001-001-001", true, false, 75000)
  }
}
