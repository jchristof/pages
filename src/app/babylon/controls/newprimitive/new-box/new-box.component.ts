import { Component, OnInit, Input } from '@angular/core';
import { SceneService } from '../../../scene.service'
import { NewPrimitive } from '../newprimitive'

@Component({
  selector: 'app-new-box',
  templateUrl: './new-box.component.html',
  styleUrls: ['./new-box.component.css']
})
export class NewBoxComponent extends NewPrimitive implements OnInit {

  constructor(private sceneService:SceneService) { 
    super();
  }

  private size:number;

  ngOnInit() {
  }

  add(){
    const box = BABYLON.Mesh.CreateBox(this.name, this.size, this.sceneService.scene);
    box.position = this.position === undefined ? new BABYLON.Vector3(0,0,0) : this.position.clone();
  }
}
