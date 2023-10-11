import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Lot, LotParams} from "../../../backend/model/lot";
import {LotService} from "../../../backend/services/lot.service";

@Component({
  selector: 'app-lots-assignment',
  templateUrl: './lots-assignment.component.html',
  styleUrls: ['./lots-assignment.component.css']
})
export class LotsAssignmentComponent implements OnInit {

  searchForm: FormGroup;
  lots!: Lot[];
  selectedLots!: Lot;

  constructor(private lotService: LotService) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup<any>({
      userFilter: new FormControl([], {nonNullable: true}),
      blockFilter: new FormControl('', {nonNullable: true}),
      zoneFilter: new FormControl('', {nonNullable: true})
    })

    this.getLots();
  }

  private async getLots() {
    this.lots = await this.lotService.getAllLots();
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
    const params = new LotParams(
      this.blockFilter.value,
      null,
      null,
      []);
    return this.lotService.getFilteredLots(params);
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
