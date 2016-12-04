import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
   <h1>{{title}}</h1>
   <a routerLink="/home">Home</a>
   <a routerLink="/babylon">Babylon</a>
   <router-outlet></router-outlet>
 `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

}
