import { Component, OnInit, ViewChild } from '@angular/core';
import { UUID } from '../../../../../../Services/UUID'
import { SceneService } from '../../../../scene.service'

@Component({
  selector: 'edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {

  constructor(private sceneService:SceneService) { }

  scene:BABYLON.Scene = null;
  material:BABYLON.StandardMaterial = null;
  diffuseTexture:string = "./assets/placeholder.png";

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

  apply():void{
    if(!this.sceneService.pickedMesh)
      return;

    const editorScene = this.sceneService.scene;
    const newMaterial = new BABYLON.StandardMaterial(UUID.generate(),editorScene);

    newMaterial.alpha = this.material.alpha;
    newMaterial.diffuseColor = this.material.diffuseColor;
    newMaterial.emissiveColor = this.material.emissiveColor;
    newMaterial.ambientColor = this.material.ambientColor;
    newMaterial.specularColor = this.material.specularColor;
    
    //newMaterial.diffuseTexture = new BABYLON.Texture("data:" + UUID.generate(), editorScene, false, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE, null, null, this.diffuseTextureImage, true);
    this.sceneService.pickedMesh.material = newMaterial;
  }

  @ViewChild('diffusecolor') diffusecolorinput;
  diffuseChange(){
    this.material.diffuseColor = BABYLON.Color3.FromHexString("#"+this.diffusecolorinput.nativeElement.value);
  }

  diffuseTextureImage:string;
  diffuseFileChange(event:Event){
    const file = (event.target as any).files[0];
    const reader = new FileReader();

    reader.onload = (evt: any) => {
        this.diffuseTextureImage = evt.target.result;
        const uuid = UUID.generate();
        this.material.diffuseTexture = new BABYLON.Texture("data:" + uuid, this.scene, false, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE, null, null, this.diffuseTextureImage, true);
        this.diffuseTexture = this.diffuseTextureImage;
    }
    reader.readAsDataURL(file);
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
