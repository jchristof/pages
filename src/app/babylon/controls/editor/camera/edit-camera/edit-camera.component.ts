import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'edit-camera',
  templateUrl: './edit-camera.component.html',
  styleUrls: ['./edit-camera.component.css']
})
export class EditCameraComponent implements OnInit {

  constructor() { }

public cameras = [ "Free", "ArcRotate"];

  ngOnInit() {
  }

}
