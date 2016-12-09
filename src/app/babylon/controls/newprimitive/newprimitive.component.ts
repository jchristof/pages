import { Component, OnInit, Input } from '@angular/core';
import { SceneService } from '../../scene.service'
@Component({
  selector: 'app-newprimitive',
  templateUrl: './newprimitive.component.html',
  styleUrls: ['./newprimitive.component.css']
})
export class NewprimitiveComponent implements OnInit {

  constructor(private sceneService:SceneService) { }

  primitives:string[] = ['box', 'sphere', 'plane', 'cylinder'];
  selectedPrimitive:string;

  ngOnInit() {
  }

  add(){
    BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.sceneService.scene);
  }
}
