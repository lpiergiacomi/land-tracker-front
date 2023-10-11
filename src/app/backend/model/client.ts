export class Client {

  id: number;
  name: string;
  document: number;
  email: string;
  phone: string;
  address: string;

  constructor() {
  }
}

export class ClientParams {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
