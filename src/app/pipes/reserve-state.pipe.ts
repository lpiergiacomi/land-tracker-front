import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reserveState'
})
export class ReserveStatePipe implements PipeTransform {

  states = {
    PENDIENTE_DE_PAGO: "Pendiente de pago",
    ABONADA: "Abonada",
    VENCIDA: "Vencida",
  }
  transform(value: string): string {
    return this.states[value]
  }
}
