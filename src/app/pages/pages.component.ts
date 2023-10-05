import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: `./pages.component.html`,
  styleUrls: ['./pages.component.css']
})

export class PagesComponent {

  estaAutenticado: boolean = true;

  constructor() {
    this.estaAutenticado = localStorage.getItem('access-token') !== '';
  }

}
