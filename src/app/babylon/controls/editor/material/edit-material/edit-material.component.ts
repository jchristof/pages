import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {

  constructor() { }

  scene:BABYLON.Scene = null;
  material:BABYLON.StandardMaterial = null;

  ngOnInit() {
    const canvas = document.getElementById('materialrenderCanvas') as HTMLCanvasElement;
    const engine = new BABYLON.Engine(canvas, true);
    this.scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 0, -3), this.scene);
    camera.setTarget(BABYLON.Vector3.Zero());

    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0), this.scene);

    const sphere = BABYLON.Mesh.CreateSphere('sphere', 16, 2, this.scene);
    this.material = new BABYLON.StandardMaterial("texture", this.scene);
    sphere.material = this.material;

    //camera.attachControl(canvas, false);
        engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  @ViewChild('diffusecolor') diffusecolorinput;
  diffuseChange(){
    this.material.diffuseColor = BABYLON.Color3.FromHexString("#"+this.diffusecolorinput.nativeElement.value);
  }

  @ViewChild('emissivecolor') emissivecolorinput;
  emissiveChange(){
    this.material.emissiveColor = BABYLON.Color3.FromHexString("#"+this.emissivecolorinput.nativeElement.value);
  }

    @ViewChild('ambientcolor') ambientcolorinput;
  ambientChange(){
    this.material.ambientColor = BABYLON.Color3.FromHexString("#"+this.ambientcolorinput.nativeElement.value);
  }

    @ViewChild('specularcolor') specularcolorinput;
  specularChange(){
    this.material.specularColor = BABYLON.Color3.FromHexString("#"+this.specularcolorinput.nativeElement.value);
  }
  changeAlpha(value:number){
    this.material.alpha = value/1000;
  }
}
