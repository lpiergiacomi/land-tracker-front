import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Lot, LotParams} from "../../../backend/model/lot";
import {LotService} from "../../../backend/services/lot.service";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {UserService} from "../../../backend/services/user.service";
import {ToastrService} from "ngx-toastr";
import {UserWithLot} from "../../../backend/model/user-with-lot";

@Component({
  selector: 'app-lots-assignment',
  templateUrl: './lots-assignment.component.html',
  styleUrls: ['./lots-assignment.component.css']
})
export class LotsAssignmentComponent implements OnInit {

  searchForm: FormGroup;
  lots!: Lot[];
  users!: UserWithLot[];
  selectedLots!: Lot[];
  filteredLots!: Lot[];
  selectedUser!: UserWithLot;

  constructor(public lotService: LotService, private userService: UserService, public toastr: ToastrService) {
  }

  async ngOnInit() {
    this.searchForm = new FormGroup<any>({
      userFilter: new FormControl('', {nonNullable: true}),
      blockFilter: new FormControl('', {nonNullable: true}),
      zoneFilter: new FormControl('', {nonNullable: true})
    })
    await this.getLots();
    await this.getUsers();
    this.setupFilters();

  }

  public async getLots() {
    const params = new LotParams(null, null, null, ["DISPONIBLE"]);
    const filteredLots = await this.lotService.getFilteredLots(params);
    this.lots = filteredLots.content;
    this.filteredLots = this.lots;
  }

  private async getUsers() {
    this.users = await this.userService.getAllUsersWithAssignedLots();
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

  async confirm() {
    this.selectedUser.assignedLotsIds = this.selectedLots.map(lot => lot.id);
    try {
      const test = await this.lotService.updateAssignedLotsToUser(this.selectedUser);
      this.toastr.success(`Cambios realizados correctamente`);
    } catch (error) {
      this.toastr.error(error);
      console.error(error);
    }
  }


  onSelectUser(user: any): void {
    this.selectedUser = user;
    this.selectedLots = this.lots.filter(lot => user.assignedLotsIds?.includes(lot.id));
    this.filterLots();
  }

  setupFilters() {
    this.searchForm.get('blockFilter')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((blockFilterValue: string) => {
      this.filterLots();
    });

    this.searchForm.get('zoneFilter')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((zoneFilterValue: string) => {
      this.filterLots();
    });

  }

  filterLots() {
    const blockFilterValue = this.blockFilter.value;
    const zoneFilterValue = this.zoneFilter.value;

    this.filteredLots = this.lots.filter(lot => {
      const matchesBlock = !blockFilterValue || lot.block.includes(blockFilterValue);
      const matchesZone = !zoneFilterValue || lot.zone.includes(zoneFilterValue);
      return matchesBlock && matchesZone;
    });
  }
}
