import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BabylonComponent } from './babylon/babylon.component';
import { RouterModule }   from '@angular/router';
import { AppRoutingModule }     from './app-routing.module';

RouterModule.forRoot([
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
])

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BabylonComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
