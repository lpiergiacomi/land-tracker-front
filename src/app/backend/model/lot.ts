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
  name: string;
  minPrice: number;
  maxPrice: number;
  states: string[];

  constructor(name: string, minPrice: number, maxPrice: number, states: string[]) {
    this.name = name;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.states = states;
  }
}

export class LotPosition {

  x: number;
  y: number;
  z: number;

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
