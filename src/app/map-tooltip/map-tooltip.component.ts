import {AfterViewInit, Component, ElementRef, Input} from '@angular/core';
import {Lote} from "../backend/model/lote";

@Component({
  selector: 'app-map-tooltip',
  templateUrl: './map-tooltip.component.html',
  styleUrls: ['./map-tooltip.component.css']
})
export class MapTooltipComponent implements AfterViewInit {
  @Input() lote: Lote;
  private htmlElement: HTMLElement;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.htmlElement = this.el.nativeElement;
  }

  // Método para obtener el elemento HTML del componente
  getAnnotationLabelElement(): HTMLElement | null {
    console.log(this.htmlElement.querySelector('.annotationLabel'))
    return this.htmlElement.querySelector('.annotationLabel');
  }

}
