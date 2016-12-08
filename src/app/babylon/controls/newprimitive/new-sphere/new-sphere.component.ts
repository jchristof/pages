import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-sphere',
  templateUrl: './new-sphere.component.html',
  styleUrls: ['./new-sphere.component.css']
})
export class NewSphereComponent implements OnInit {

  constructor() { }

  private diameter:number;
  private segments:number;
  
  ngOnInit() {
  }

}
