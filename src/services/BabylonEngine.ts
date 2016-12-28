import { Injectable } from '@angular/core';

@Injectable()
export class BabylonEngine{
    
    init(canvas:HTMLCanvasElement):BABYLON.Engine{
        this.renderTasks = new Array<()=>void>();
        this._engine = new BABYLON.Engine(canvas, true);
        this._engine.runRenderLoop(()=>this.runRenderTasks())
        window.addEventListener("resize", ()=>this._engine.resize());

        return this._engine;
    }

    dispose(){
        window.removeEventListener("resize");
        this.renderTasks = null;
        this._engine.dispose();
        this._engine = null;
    }

    private resizeEventListener(){
        this._engine.resize();
    }

    newScene():BABYLON.Scene{
        return new BABYLON.Scene(this._engine);
    }

    private renderTasks:Array<()=>void>
    addRenderTask(renderTask:()=>void):void{
        this.renderTasks.push(renderTask);
    }

    runRenderTasks(){
        for(let i=0;i<this.renderTasks.length; i++){
            this.renderTasks[i]();
        }
    }

    private _engine:BABYLON.Engine;
    get engine(){
        return this._engine;
    }
}

