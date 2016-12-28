import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
   <h1>{{title}}</h1>
   <a routerLink="/home">Home</a>
   <a routerLink="/gba">Game Boy Advance</a>
   <a routerLink="/audio">Audio</a>
   <a routerLink="/babylon">Babylon</a>
   <a routerLink="/toadattack">ToadAttack</a>
   <router-outlet></router-outlet>
 `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jchristof';
}
