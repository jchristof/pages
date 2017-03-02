import { Component, OnInit } from '@angular/core';
import { SceneService } from '../../../scene.service'
import { FileSystem } from '../../../../../services/FileSystem'
import { NewPrimitive } from '../newprimitive'
import { UUID } from '../../../../../Services/UUID'

@Component({
  selector: 'load-mesh',
  templateUrl: './load-mesh.component.html',
  styleUrls: ['./load-mesh.component.css']
})

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
      BABYLON.SceneLoader.ImportMesh("", "", 'data:' + babylonFile, this.sceneService.scene,  (newMeshes, particleSystems, skeletons) => {
        if(newMeshes){
           newMeshes.forEach(mesh=>{
              console.log("loaded mesh: " + mesh.name);
              if(mesh.animations){
                mesh.animations.forEach(animation=>{
                    console.log("animation: " + animation.name)
                })
              }
           })   
        }
        if(skeletons){
          skeletons.forEach(skeleton=>{
            console.log("loaded skeleton: " + skeleton.name);
            
          })
        }
         
        // console.log()
        // var dude = newMeshes[0];
        // dude.animations.length
        // skeletons[0].an
        //dude.rotation.x = Math.PI;
       // dude.position = new BABYLON.Vector3(0, 0, -80);

        this.sceneService.scene.beginAnimation(skeletons[0], 0, 800, true, 1.0);
    });
    }

    reader.readAsText(this.fileSystem.getFile(filename));
  }
}
