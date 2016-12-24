import { Component, OnInit } from '@angular/core';
import { SceneService } from '../../../scene.service'
import { NewPrimitive } from '../newprimitive'
import { UUID } from '../../../../../Services/UUID'

@Component(Object.assign({
  selector: 'load-mesh',
  templateUrl: './load-mesh.component.html',
  styleUrls: ['./load-mesh.component.css']
}, NewPrimitive.metaData))

export class LoadMeshComponent extends NewPrimitive implements OnInit {

  constructor(private sceneService:SceneService) { 
    super();
  }

  ngOnInit() {
  }

  fileChanged(files:FileList){
    const reader = new FileReader();
    BABYLON.Tools.LoadImage = (url: any, onload: any, onerror: any, database: any):HTMLImageElement=>{
      const imageReader = new FileReader();
      const img = new Image();

      imageReader.onload = (evt: any)=>{
        img.onload = () => {
          onload(img);
        };
        img.src = evt.target.result;
      }

      for(let i=0; i<files.length; i++){
        let file = files.item(i);
        if(file.name === url){
          imageReader.readAsDataURL(file);
          break;
        }
      }
      
      return img;
    }
    reader.onload = (evt: any) => {
        const babylonFile = evt.target.result;
        BABYLON.SceneLoader.ImportMesh("", "", 'data:' + babylonFile, this.sceneService.scene);
    }
    for(let i=0; i<files.length; i++){
      let file = files.item(i);
      if(file.name.indexOf('.babylon') !== -1){
        reader.readAsText(file);
        break;
      }
    }
  }
}
