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
    //this.sceneService.sceneChangedSubscribers.push(()=>{});
  }

  selectedMesh:any;
  meshes:any;

  ngOnInit():void {
    this.meshes = this.sceneService.scene.meshes;
  }

  ngAfterViewInit():void {
    this.input.nativeElement.value = this.sceneService.scene.clearColor.toHexString().substring(1,7);
  }

  update():void{
    this.sceneService.scene.clearColor = BABYLON.Color4.FromHexString("#"+this.input.nativeElement.value+"ff");
  }

  onChange(value:any){
    console.log(value);
  }

  groundMesh:BABYLON.AbstractMesh;
  showGroundChange(checked):void{
    if(checked){
      const scene = this.sceneService.scene;
      const subdivisions = {w:10,h:10};
      this.groundMesh = BABYLON.Mesh.CreateTiledGround('_scene_editor_ground', -50, -50, 50, 50, subdivisions ,{w:1,h:1}, scene);
      var whiteMaterial = new BABYLON.StandardMaterial("White", scene);
      whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
      whiteMaterial.alpha = .2;
      var blackMaterial = new BABYLON.StandardMaterial("Black", scene);
      blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      blackMaterial.alpha = .2;

      var multimat = new BABYLON.MultiMaterial("multi", scene);
      multimat.subMaterials.push(whiteMaterial);
      multimat.subMaterials.push(blackMaterial);

      this.groundMesh.material = multimat;

      var verticesCount = this.groundMesh.getTotalVertices();
      var tileIndicesLength = this.groundMesh.getIndices().length / (subdivisions.w * subdivisions.h);

      this.groundMesh.subMeshes = [];
      var base = 0;
      for (var row = 0; row < subdivisions.h; row++) {
          for (var col = 0; col < subdivisions.w; col++) {
              this.groundMesh.subMeshes.push(new BABYLON.SubMesh(row%2 ^ col%2, 0, verticesCount, base, tileIndicesLength, this.groundMesh));
              base += tileIndicesLength;
          }
      }

      //this.groundMesh = BABYLON.Mesh.CreateGround('_scene_editor_ground', 100, 100, 10, this.sceneService.scene);
      // this.groundMesh.material = new BABYLON.StandardMaterial("material", scene);
      // this.groundMesh.material.wireframe = true;
      // this.groundMesh.material.alpha = .5;
    }
    else if(this.groundMesh){
      this.groundMesh.dispose();
      this.groundMesh = null;
    }

  }

  clear():void{
    this.sceneService.clearScene();
  }
}
