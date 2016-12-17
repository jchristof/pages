import { Component, OnInit, DoCheck } from '@angular/core';
import { SceneService } from '../../../../scene.service'

@Component({
  selector: 'modify-mesh',
  templateUrl: './modify-mesh.component.html',
  styleUrls: ['./modify-mesh.component.css']
})
export class ModifyMeshComponent implements OnInit, DoCheck {

  constructor(private sceneService:SceneService) { 
    
  }

  mesh:BABYLON.AbstractMesh;
  position:BABYLON.Vector3 = BABYLON.Vector3.Zero();
 
  ngDoCheck(){
    const mesh = this.sceneService.pickedMesh;

    if(mesh && this.mesh !== mesh){
      this.mesh = mesh;
      this.position = mesh.position;
    }
  }

  ngOnInit() {
  }

}
