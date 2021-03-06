import { Component, OnInit, OnDestroy } from '@angular/core';
import { BabylonEngine } from '../../services/BabylonEngine'
import { ToadAttack } from './toadattack'
import { Plane } from './plane'
import { IGame } from '../../models/IGame'

@Component({
  selector: 'app-toadattack',
  templateUrl: './toadattack.component.html',
  styleUrls: ['./toadattack.component.css']
})
export class ToadattackComponent implements OnInit, OnDestroy {

  constructor(private babylonEngine:BabylonEngine) { }

  private game:IGame;

  ngOnInit(): void { 
    var canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    this.babylonEngine.init(canvas);   
    
    //this.game = new ToadAttack(this.babylonEngine.newScene(), canvas);
    this.game = new Plane(this.babylonEngine.newScene(), canvas);
    this.babylonEngine.addRenderTask(()=>this.game.render());
  }

  ngOnDestroy(){
      this.game.dispose();
      this.babylonEngine.dispose();
  }

}
