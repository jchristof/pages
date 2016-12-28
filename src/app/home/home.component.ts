import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimatedPrimitive } from './AnimatedPrimitive'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor() { }

  private animatedPrimitive:Array<AnimatedPrimitive> = [];
  private engine:BABYLON.Engine;
  private scene:BABYLON.Scene;
  
  ngOnInit() {
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    const engine = this.engine = new BABYLON.Engine(canvas, true);
    const scene = this.scene = new BABYLON.Scene(engine);
    
    scene.clearColor = new BABYLON.Color4(0,0,0,0.0000000000000001);
    
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0,-10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());

    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,-1), scene);
    const box = BABYLON.Mesh.CreateBox("box", 5, scene);

    const material = new BABYLON.StandardMaterial("material", scene);
    box.material = material;
    
    material.diffuseColor = BABYLON.Color3.FromInts(51, 102, 153);

    const animationBox = new BABYLON.Animation("yRotAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keys = []; 
    keys.push({
      frame: 0,
      value: 0
    });

    keys.push({
      frame: 119,
      value: Math.PI/2
    });

    animationBox.setKeys(keys);
    box.animations.push(animationBox);

    scene.beginAnimation(box, 0, 119, true);

    for(let i=0; i<100; i++){
      this.animatedPrimitive.push(new AnimatedPrimitive(engine, scene, camera));

      setTimeout(()=>{
        this.animatedPrimitive[i].start();
      },1000 * Math.random());
    }
    engine.runRenderLoop(() => {
      scene.render();
      
    });

    window.addEventListener("resize", function () {
      engine.resize();
    });
  }

  ngOnDestroy(){
    this.animatedPrimitive.forEach(animation=>{
      animation.dispose();
    })
    if(this.scene)
      this.scene.dispose();
    if(this.engine)
    this.engine.dispose();
  }
  
}
