import { Injectable } from '@angular/core';

@Injectable()
export class SceneService {
    constructor(){
        this.sceneChangedSubscribers = [];
    }

    private _scene:BABYLON.Scene;

    get scene(): BABYLON.Scene {
        return this._scene;
    }

    sceneChangedSubscribers:Array<()=>void>;
    
    set scene(scene:BABYLON.Scene){
        this._scene = scene;
        this._scene.onNewMeshAddedObservable.add((eventData: BABYLON.AbstractMesh, eventState: any) => {
            this.sceneChangedSubscribers.forEach((element)=>{
                element();
            })
        });
    }
}