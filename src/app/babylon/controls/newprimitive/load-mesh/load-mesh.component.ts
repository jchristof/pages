import { Component, OnInit } from '@angular/core';
import { SceneService } from '../../../scene.service'
import { FileSystem } from '../../../../../services/FileSystem'
import { NewPrimitive } from '../newprimitive'
import { UUID } from '../../../../../Services/UUID'

@Component(Object.assign({
  selector: 'load-mesh',
  templateUrl: './load-mesh.component.html',
  styleUrls: ['./load-mesh.component.css']
}, NewPrimitive.metaData))

export class LoadMeshComponent extends NewPrimitive implements OnInit {

  constructor(private sceneService:SceneService, public fileSystem:FileSystem) { 
    super();
  }

  ngOnInit() {
  }

  meshItemSelected(filename:string):void{
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      const babylonFile = evt.target.result;
      BABYLON.SceneLoader.ImportMesh("", "", 'data:' + babylonFile, this.sceneService.scene);
    }

    reader.readAsText(this.fileSystem.getFile(filename));
  }
}
