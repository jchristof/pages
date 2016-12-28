import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }   from './home/home.component';
import { BabylonComponent }      from './babylon/babylon.component';
import { GbaComponent }      from './gba/gba.component';
import { AudioComponent } from './audio/audio.component'
import { ToadattackComponent } from './toadattack/toadattack.component'
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'gba',  component: GbaComponent },
  { path: 'audio',  component: AudioComponent },
  { path: 'babylon',     component: BabylonComponent },
  { path: 'toadattack',     component: ToadattackComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}