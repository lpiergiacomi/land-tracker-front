import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LotService} from "../../../backend/services/lot.service";
import {Lot, LotParams} from "../../../backend/model/lot";

@Component({
  selector: 'app-map-lot-searcher',
  templateUrl: './map-lot-searcher.component.html',
  styleUrls: ['./map-lot-searcher.component.css']
})
export class MapLotSearcherComponent implements OnInit {

  lotState = new FormControl('');
  lotStates: string[] = ['Disponible', 'Reservado', 'Vendido'];

  @Output()
  changeLotsEventEmitter = new EventEmitter<Lot[]>();

  lots: Lot[] = [];
  formSearcherLots: FormGroup;
  panelOpenState = true;

  constructor(private lotService: LotService) {
  }

  ngOnInit(): void {
    this.formSearcherLots = new FormGroup<any>({
      filterText: new FormControl('', {nonNullable: true}),
      filterStates: new FormControl([], {nonNullable: true})
    })
  }

  public async filterLots() {
    const filteredLots = await this.getFilteredLots();
    this.lots = filteredLots.content;
    this.changeLotsEventEmitter.emit(this.lots);
  }

  public async getFilteredLots() {
    const params = new LotParams(
      this.filterText.value,
      null,
      null,
      this.filterStates.value.map(state => state.toUpperCase()));
    return await this.lotService.getFilteredLots(params);
  }

  get filterText() {
    return this.formSearcherLots.get('filterText');
  }

  get filterStates() {
    return this.formSearcherLots.get('filterStates');
  }


  async cleanFilters() {
    this.formSearcherLots.reset();
    await this.filterLots();
  }
}
