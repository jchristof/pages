import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BabylonComponent } from './babylon/babylon.component';
import { RouterModule }   from '@angular/router';
import { AppRoutingModule }     from './app-routing.module';
import { GbaComponent } from './gba/gba.component';
import { AudioComponent } from './audio/audio.component';
import { NewprimitiveComponent } from './babylon/controls/newprimitive/newprimitive.component';
import { NewSphereComponent } from './babylon/controls/newprimitive/new-sphere/new-sphere.component';
import { SceneService } from './babylon/scene.service';
import { NewBoxComponent } from './babylon/controls/newprimitive/new-box/new-box.component';
import { SceneEditorComponent } from './babylon/controls/editor/scene-editor/scene-editor.component';
import { Tabs } from './uicomponents/tabs/tabs.component';
import { Tab } from './uicomponents/tabs/tab.component';
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
    BabylonComponent,
    GbaComponent,
    AudioComponent,
    NewprimitiveComponent,
    NewSphereComponent,
    NewBoxComponent,
    SceneEditorComponent,
    Tab, Tabs
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    
  ],
  providers: [
    SceneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
