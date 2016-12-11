import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-newprimitive',
  templateUrl: './newprimitive.component.html',
  styleUrls: ['./newprimitive.component.css']
})
export class NewprimitiveComponent implements OnInit {

  constructor() { }

  primitives:string[] = ['box', 'sphere', 'plane', 'cylinder'];
  selectedPrimitive:string;

  name:string;
  position:BABYLON.Vector3;

  ngOnInit() {
    this.selectedPrimitive = 'sphere';
    this.position = new BABYLON.Vector3(0,0,0);
  }

}
