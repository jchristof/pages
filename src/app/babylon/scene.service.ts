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

    private pickingInfo:BABYLON.PickingInfo;
    set pickResult(pickResult:BABYLON.PickingInfo){
        this.unselectPreviousPick();

        pickResult.pickedMesh.material = new BABYLON.StandardMaterial("material", this.scene);
        this.pickingInfo = pickResult;
        this.pickingInfo.pickedMesh.material.wireframe = true;
        this.pickingInfo.pickedMesh.material.alpha = .5;
    }

    unselectPreviousPick():void{
        if(this.pickingInfo){
            this.pickingInfo.pickedMesh.material.wireframe = false;
            this.pickingInfo.pickedMesh.material.alpha = 1;
        }
    }

    clearScene():void{
        this.pickingInfo = null;
        this.scene.meshes.forEach((mesh)=>{
            mesh.dispose();
        });
        
    }
}