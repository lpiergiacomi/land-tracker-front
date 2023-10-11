import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Lote, LoteParams} from "../../../backend/model/lote";
import {LoteService} from "../../../backend/services/lote.service";

@Component({
  selector: 'app-lots-assignment',
  templateUrl: './lots-assignment.component.html',
  styleUrls: ['./lots-assignment.component.css']
})
export class LotsAssignmentComponent implements OnInit {

  searchForm: FormGroup;
  lots!: Lote[];
  selectedLots!: Lote;

  constructor(private loteService: LoteService) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup<any>({
      userFilter: new FormControl([], {nonNullable: true}),
      blockFilter: new FormControl('', {nonNullable: true}),
      zoneFilter: new FormControl('', {nonNullable: true})
    })

    this.getLotes();
  }

  private async getLotes() {
    this.lots = await this.loteService.getLotes();
  }

  filterLots() {
    this.getFilteredLots().subscribe({
      next: (response) => {
        this.lots = response.content;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getFilteredLots() {
    const params = new LoteParams(
      this.blockFilter.value,
      null,
      null,
      []);
    return this.loteService.getLotesFiltrados(params);
  }

  cleanFilter() {
    this.searchForm.reset();
    this.filterLots();
  }

  get userFilter() {
    return this.searchForm.get('userFilter');
  }

  get blockFilter() {
    return this.searchForm.get('blockFilter');
  }

  get zoneFilter() {
    return this.searchForm.get('zoneFilter');
  }

  confirm() {
    console.log(this.selectedLots);
  }
}
