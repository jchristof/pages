import { Component, OnInit, ViewChild } from '@angular/core';
import { SceneService } from '../../../scene.service'
import { FileSystem } from '../../../../../services/FileSystem'

@Component({
  selector: 'app-scene-editor',
  templateUrl: './scene-editor.component.html',
  styleUrls: ['./scene-editor.component.css']
})

export class SceneEditorComponent implements OnInit {
  @ViewChild('jscolor') input;

  constructor(private sceneService:SceneService, public fileSystem:FileSystem) {    
  }

  selectedMesh:any;
  meshes:any;

  selectedMaterial:any;
  materials:any;

  ngOnInit():void {
    this.meshes = this.sceneService.scene.meshes;
    this.materials = this.sceneService.scene.materials;
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

  fileChanged(target:HTMLInputElement){
      this.fileSystem.addFiles(target.files);
      target.type = '';
      target.type = 'file';
  }
//https://makina-corpus.com/blog/metier/2014/how-to-use-multimaterials-with-a-tiled-ground-in-babylonjs
  groundMesh:BABYLON.AbstractMesh;
  showGroundChange(checked):void{
    if(checked){
      const scene = this.sceneService.scene;
      const subdivisions = {w:10,h:10};
      this.groundMesh = BABYLON.Mesh.CreateTiledGround('_scene_editor_ground', -50, -50, 50, 50, subdivisions ,{w:1,h:1}, scene);

      const whiteMaterial = new BABYLON.StandardMaterial("White", scene);
      whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
      whiteMaterial.alpha = .2;

      const blackMaterial = new BABYLON.StandardMaterial("Black", scene);
      blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      blackMaterial.alpha = .2;

      const multimat = new BABYLON.MultiMaterial("multi", scene);
      multimat.subMaterials.push(whiteMaterial);
      multimat.subMaterials.push(blackMaterial);

      this.groundMesh.material = multimat;

      const verticesCount = this.groundMesh.getTotalVertices();
      const tileIndicesLength = this.groundMesh.getIndices().length / (subdivisions.w * subdivisions.h);

      this.groundMesh.subMeshes = [];
      let base = 0;
      for (let row = 0; row < subdivisions.h; row++) {
          for (let col = 0; col < subdivisions.w; col++) {
              this.groundMesh.subMeshes.push(new BABYLON.SubMesh(row%2 ^ col%2, 0, verticesCount, base, tileIndicesLength, this.groundMesh));
              base += tileIndicesLength;
          }
      }
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
