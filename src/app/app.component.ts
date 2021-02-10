import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items!: MenuItem[];

  title = 'Tour of Heroes';

  constructor(private router: Router) {}

  getRoute() {
    return this.router;
  }

  ngOnInit() {
    this.items = [
        {label: 'Dashboard', routerLink: ['/dashboard']},
        {label: 'Heroes', routerLink: ['/heroes']},
        {label: 'Gadgets', routerLink: ['/gadgets']},
        {label: 'Tourney', routerLink: ['/tourney']},
        {label: 'Logout', routerLink: ['/logout']}
    ];
}
}
