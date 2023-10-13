import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Lot} from "../../../backend/model/lot";
import {LotService} from "../../../backend/services/lot.service";
import {User} from "../../../backend/model/user";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {UserService} from "../../../backend/services/user.service";

@Component({
  selector: 'app-lots-assignment',
  templateUrl: './lots-assignment.component.html',
  styleUrls: ['./lots-assignment.component.css']
})
export class LotsAssignmentComponent implements OnInit {

  searchForm: FormGroup;
  lots!: Lot[];
  users!: User[];
  selectedLots!: Lot[];
  filteredLots!: Lot[];
  selectedUser!: User;

  constructor(private lotService: LotService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup<any>({
      userFilter: new FormControl('', {nonNullable: true}),
      blockFilter: new FormControl('', {nonNullable: true}),
      zoneFilter: new FormControl('', {nonNullable: true})
    })

    this.getLots();
    this.getUsers();
    this.setupFilters();

  }

  private async getLots() {
    this.lots = await this.lotService.getAllLots();
    this.filteredLots = this.lots;
  }

  private getUsers() {
    this.userService.getAllUsersWithAssignedLots().subscribe({
      next: (response) => {
        console.log(response);
        this.users = response as User[];
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  /*
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
*/

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
    this.selectedUser.assignedLotsIds = this.selectedLots.map(lot => lot.id);
    console.log(this.selectedUser);
  }


  onSelectUser(user: any): void {
    this.selectedUser = user;
    this.selectedLots = this.lots.filter(lot => user.assignedLotsIds?.includes(lot.id));
    this.filterLots();
  }

  setupFilters() {
    this.searchForm.get('blockFilter')!.valueChanges.pipe(
      debounceTime(300), // Espera 300ms de inactividad antes de aplicar el filtro
      distinctUntilChanged(), // Ignora cambios repetidos
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
