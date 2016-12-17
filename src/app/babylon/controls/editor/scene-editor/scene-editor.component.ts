import { Component, OnInit, ViewChild } from '@angular/core';
import { SceneService } from '../../../scene.service'

@Component({
  selector: 'app-scene-editor',
  templateUrl: './scene-editor.component.html',
  styleUrls: ['./scene-editor.component.css']
})



export class SceneEditorComponent implements OnInit {
  @ViewChild('jscolor') input;

  constructor(private sceneService:SceneService) { 
    
    this.sceneService.sceneChangedSubscribers.push(()=>{

    });
  }

 selectedMesh:any;
 meshes:any;
  update(){
    this.sceneService.scene.clearColor = BABYLON.Color4.FromHexString("#"+this.input.nativeElement.value+"ff");
  }

  onChange(value:any){
    console.log(value);
  }

  groundMesh:BABYLON.AbstractMesh;
  showGroundChange(checked){
    if(checked){
      this.groundMesh = BABYLON.Mesh.CreateGround('_scene_editor_ground', 100, 100, 10, this.sceneService.scene);
      this.groundMesh.material = new BABYLON.StandardMaterial("material", this.sceneService.scene);
      this.groundMesh.material.wireframe = true;
      this.groundMesh.material.alpha = .5;
    }
    else if(this.groundMesh){
      this.groundMesh.dispose();
      this.groundMesh = null;
    }

  }

  clear(){
    this.sceneService.clearScene();
  }
  ngOnInit() {
    this.meshes = this.sceneService.scene.meshes;
  }

  ngAfterViewInit() {
    this.input.nativeElement.value = this.sceneService.scene.clearColor.toHexString().substring(1,7);
  }

}
