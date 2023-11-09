import {Reserve} from "./reserve";
import {Payment} from "./payment";

export class Lot {

  id: number;
  name: string;
  area: number;
  block: string;
  zone: string;
  state: string;
  position: LotPosition;
  metersFront: number;
  metersBack: number;
  cadastralAccNumber: string;
  municipalAccNumber: string;
  hasLight: boolean;
  hasWater: boolean;
  price: number;
  reserve: Reserve;
  payments: Payment[];

  constructor() {
  }

  public canReserve(assignedLots: any[]): boolean {
    return this.isAvailable() && this.hasAssigned(assignedLots);
  }

  public hasAssigned(assignedLots: any[]) {
    return assignedLots?.includes(this.id);
  }

  public isAvailable() {
    return this.state == 'DISPONIBLE';
  }

  public isReserved() {
    return this.state == 'RESERVADO';
  }

  canAddPayment(assignedLots: any[]) {
    return this.isReserved() && this.hasAssigned(assignedLots);
  }

  public getStateColor() {
    let color = 0x28a745;
    if (this?.state == 'RESERVADO')
      color = 0xffc107;
    if (this?.state == 'VENDIDO')
      color = 0xdc3545;
    return color;
  }
}

export class LotParams {
  constructor(public name: string, public minPrice: number, public maxPrice: number, public states: string[]) {
  }
}

export class LotPosition {
  constructor(public x, public y, public z) {
  }
}
