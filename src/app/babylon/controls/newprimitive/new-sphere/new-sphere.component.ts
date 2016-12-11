import { Component, OnInit, Input } from '@angular/core';
import { SceneService } from '../../../scene.service'
import { NewPrimitive } from '../newprimitive'

@Component(Object.assign({
  selector: 'app-new-sphere',
  templateUrl: './new-sphere.component.html',
  styleUrls: ['./new-sphere.component.css']
}, NewPrimitive.metaData))
export class NewSphereComponent extends NewPrimitive implements OnInit {

  constructor(private sceneService:SceneService) { 
    super();
  }

  private diameter:number;
  private segments:number;

  ngOnInit() {
  }

  add(){
    const sphere = BABYLON.Mesh.CreateSphere(this.name, this.segments, this.diameter, this.sceneService.scene);
    sphere.position = this.position === undefined ? new BABYLON.Vector3(0,0,0) : this.position.clone();
  }
}
