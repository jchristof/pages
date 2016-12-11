import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    const engine = new BABYLON.Engine(canvas, true);

    // create a basic BJS Scene object
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0,0,0,0.0000000000000001);
    
    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0,-10), scene);

    // target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    //camera.attachControl(canvas, false);

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,-1), scene);
    const box = BABYLON.Mesh.CreateBox("box", 5, scene);
    // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
    //var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.scene);

    // move the sphere upward 1/2 of its height
   // box.position.y = 1;

    const material = new BABYLON.StandardMaterial("material", scene);
    box.material = material;
    box.material.alpha = 0.5;
    material.diffuseColor = BABYLON.Color3.FromInts(51, 102, 153);
    //material.diffuseTexture = new BABYLON.Texture("./assets/grass.png", scene);
    // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
    //var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

    engine.runRenderLoop(() => {
      box.rotation.y += 0.005; 
      scene.render();
    });

    window.addEventListener("resize", function () {
      engine.resize();
    });
  }

}
