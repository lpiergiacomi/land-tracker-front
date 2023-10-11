import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: `./pages.component.html`,
  styleUrls: ['./pages.component.css']
})

export class PagesComponent {

  isAuthenticated: boolean = true;

  constructor() {
    this.isAuthenticated = localStorage.getItem('access-token') !== '';
  }

}
