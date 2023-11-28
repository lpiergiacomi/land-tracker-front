import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lot} from "../../../backend/model/lot";

@Component({
  selector: 'app-reserve-details',
  templateUrl: './reserve-details.component.html',
  styleUrls: ['./reserve-details.component.css']
})
export class ReserveDetailsComponent implements OnInit{
  @Input() lot: Lot;
  @Output() changeDueDateEvent = new EventEmitter<Date>();

  lotReserveDueDate: Date;

  ngOnInit(): void {
    const utcDate = new Date(this.lot.reserve.dueDate);
    utcDate.setHours(utcDate.getHours() + 3);
    this.lotReserveDueDate = utcDate;
  }

  changeDueDate() {
    this.changeDueDateEvent.emit(this.lotReserveDueDate);
  }
}
