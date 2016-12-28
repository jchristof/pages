import { Component, OnInit, OnDestroy  } from '@angular/core';
import { SceneService } from './scene.service'
import { FileSystem } from '../../services/FileSystem'
import { BabylonEngine } from '../../services/BabylonEngine'

@Component({
  selector: 'app-babylon',
  templateUrl: './babylon.component.html',
  styleUrls: ['./babylon.component.css']
})
export class BabylonComponent implements OnInit, OnDestroy  {

  constructor(private babylonEngine:BabylonEngine, private sceneSerice:SceneService, private fileSystem:FileSystem) { }

  scene:BABYLON.Scene = null;

  ngOnInit(): void { 
    var canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    var engine = this.babylonEngine.init(canvas);

    // create a basic BJS Scene object
    this.scene = new BABYLON.Scene(engine);
    this.sceneSerice.scene = this.scene;

    this.babylonToolsImageLoader = BABYLON.Tools.LoadImage;

    BABYLON.Tools.LoadImage = (url: any, onload: any, onerror: any, database: any):HTMLImageElement => {
      return this.fileSystem.loadImage(url, onload, onerror, database)
    };
    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    var camera = new BABYLON.UniversalCamera('camera1', new BABYLON.Vector3(0, 5,-10), this.scene);
    
    camera.setTarget(BABYLON.Vector3.Zero());

    camera.attachControl(canvas, false);

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);

    this.babylonEngine.addRenderTask(()=>{
        this.scene.render();
    });

   window.addEventListener("click", () => {
      const pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY, 
      (mesh:BABYLON.AbstractMesh)=>{
          return mesh.id === '_scene_editor_ground' ? false : true;
      });
      if(pickResult.hit)
        this.sceneSerice.pickResult = pickResult;
      else
        this.sceneSerice.unselectPreviousPick();
    });
  }

  private babylonToolsImageLoader:(url: any, onload: any, onerror: any, database: any)=>HTMLImageElement;
  ngOnDestroy(){
    BABYLON.Tools.LoadImage = this.babylonToolsImageLoader;
    if(this.scene)
      this.scene.dispose();
    this.babylonEngine.dispose();
  }
}
