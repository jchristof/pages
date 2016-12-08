import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newprimitive',
  templateUrl: './newprimitive.component.html',
  styleUrls: ['./newprimitive.component.css']
})
export class NewprimitiveComponent implements OnInit {

  constructor() { }

  primitives:string[] = ['box', 'sphere', 'plane', 'cylinder'];
  selectedPrimitive:string;
  ngOnInit() {
  }

  add(){
    //BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
  }
}
