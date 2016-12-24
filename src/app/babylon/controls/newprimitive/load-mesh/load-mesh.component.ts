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

  static fileListToArray(files:FileList):Array<File>{
    const fileArray = new Array<File>();

    if(files == null || files.length === 0)
      return fileArray;
   
    for(let i=0; i<files.length; i++){
        fileArray.push(files.item(i));
    }

    return fileArray;
  }

  fileChanged(target:HTMLInputElement){
    const files = LoadMeshComponent.fileListToArray(target.files);
    target.type = '';
    target.type = 'file';

    const reader = new FileReader();
    
    BABYLON.Tools.LoadImage = (url: any, onload: any, onerror: any, database: any):HTMLImageElement=>{
      const img = new Image();

      img.onload = () => {
        onload(img);
        window.URL.revokeObjectURL(img.src);
      };

      img.onerror = () => {
        window.URL.revokeObjectURL(img.src);
      }
        
      const imageFile = files.find(x=>x.name === url);
      img.src = window.URL.createObjectURL(imageFile);
      
      return img;
    }
    reader.onload = (evt: any) => {
        const babylonFile = evt.target.result;
        BABYLON.SceneLoader.ImportMesh("", "", 'data:' + babylonFile, this.sceneService.scene);
    }

    files.filter((file:File, index:number, array:File[]):void=>{
        if(file.name.indexOf('.babylon') !== -1)
          reader.readAsText(file);
    });
  }
}
