import { Component, OnInit, OnDestroy } from '@angular/core';
import { BabylonEngine } from '../../services/BabylonEngine'
import { Plane } from './plane/plane'
import { Physics } from './techphysics/physics'
import { Shader } from './shader/Shader'
import { IGame } from '../../models/IGame'

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit, OnDestroy {

  constructor(private babylonEngine:BabylonEngine) { }

  private game:IGame;

  ngOnInit(): void { 
    var canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    this.babylonEngine.init(canvas);   

    //this.game = new Plane(this.babylonEngine.newScene(), canvas);
    //this.game = new Physics(this.babylonEngine.newScene(), canvas);
    this.game = new Shader(this.babylonEngine.newScene(), canvas);
    this.babylonEngine.addRenderTask(()=>this.game.render());
  }

  ngOnDestroy(){
      this.game.dispose();
      this.babylonEngine.dispose();
  }

}
