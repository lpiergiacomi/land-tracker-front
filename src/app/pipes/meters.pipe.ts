import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meters'
})
export class MetersPipe implements PipeTransform {
  transform(value: number): string {
    return `${value} m`;
  }
}
