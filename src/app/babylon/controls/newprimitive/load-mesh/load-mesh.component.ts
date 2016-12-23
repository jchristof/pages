import { Component, OnInit } from '@angular/core';
import { SceneService } from '../../../scene.service'
import { NewPrimitive } from '../newprimitive'

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

}
