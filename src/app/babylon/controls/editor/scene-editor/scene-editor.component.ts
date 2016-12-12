import { Component, OnInit, ViewChild } from '@angular/core';
import { SceneService } from '../../../scene.service'

@Component({
  selector: 'app-scene-editor',
  templateUrl: './scene-editor.component.html',
  styleUrls: ['./scene-editor.component.css']
})


export class SceneEditorComponent implements OnInit {
  @ViewChild('jscolor') input;

  constructor(private sceneService:SceneService) { }

  update(){
    this.sceneService.scene.clearColor = BABYLON.Color4.FromHexString("#"+this.input.nativeElement.value+"ff");
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.input.nativeElement.value = this.sceneService.scene.clearColor.toHexString().substring(1,7);
  }

}
