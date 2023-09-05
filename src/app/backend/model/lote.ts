export class Lote {
    
    id: number;
    nombre: string;
    superficie: number;
    estadoLote: string;
    posicionLote: PosicionLote;

    constructor(id, nombre, superficie, estadoLote, posicionLote) {
        this.id = id;
        this.nombre = nombre;
        this.superficie = superficie;
        this.estadoLote = estadoLote;
        this.posicionLote = posicionLote;
    }
}

export class PosicionLote {

    x: number;
    y: number;
    z: number;

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}