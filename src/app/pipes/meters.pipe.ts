import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metros'
})
export class MetrosPipe implements PipeTransform {
  transform(value: number): string {
    return `${value} m`;
  }
}
