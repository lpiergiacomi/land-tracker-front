import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'squareMeters'
})
export class SquareMetersPipe implements PipeTransform {
  transform(value: number): string {
    return `${value} m²`;
  }
}
