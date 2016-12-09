import { Injectable } from '@angular/core';

@Injectable()
export class SceneService {
    private _scene:BABYLON.Scene;

    get scene(): BABYLON.Scene {
        return this._scene;
    }

    set scene(scene:BABYLON.Scene){
        this._scene = scene;
    }
}