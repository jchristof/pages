import { Component, OnInit } from '@angular/core';
import { SceneService } from './scene.service'
@Component({
  selector: 'app-babylon',
  templateUrl: './babylon.component.html',
  styleUrls: ['./babylon.component.css']
})
export class BabylonComponent implements OnInit {

  constructor(private sceneSerice:SceneService) { 
  }

  scene:BABYLON.Scene = null;

  ngOnInit(): void { 
    var canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    var engine = new BABYLON.Engine(canvas, true);

    // create a basic BJS Scene object
    this.scene = new BABYLON.Scene(engine);
    this.sceneSerice.scene = this.scene;

    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), this.scene);

    // target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    camera.attachControl(canvas, false);

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);

    // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
    //var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.scene);

    // move the sphere upward 1/2 of its height
    //sphere.position.y = 1;

    //const material = new BABYLON.StandardMaterial("texture1", scene);
    //sphere.material = material;
    //sphere.material.alpha = 0.5;
    //material.diffuseTexture = new BABYLON.Texture("./assets/grass.png", scene);
    // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
    //var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

    engine.runRenderLoop(() => {
      this.scene.render();
  });
  }

}
