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

}

export class LotParams {
  constructor(public name: string, public minPrice: number, public maxPrice: number, public states: string[]) {
  }
}

export class LotPosition {
  constructor(public x, public y, public z) {
  }
}
