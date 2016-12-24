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
    get pickedMesh():BABYLON.AbstractMesh{
        return this.pickingInfo ? this.pickingInfo.pickedMesh : null;
    }
    
    set pickResult(pickResult:BABYLON.PickingInfo){
        this.unselectPreviousPick();

        this.pickingInfo = pickResult;
        this.pickingInfo.pickedMesh.enableEdgesRendering();    
        this.pickingInfo.pickedMesh.edgesWidth = 4.0;
        this.pickingInfo.pickedMesh.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
    }

    unselectPreviousPick():void{
        if(!this.pickingInfo)
            return;

        this.pickingInfo.pickedMesh.disableEdgesRendering();    
        this.pickingInfo.pickedMesh.edgesColor = null;
        
    }

    clearScene():void{
        this.pickingInfo = null;
        this.scene.meshes.forEach((mesh)=>{
            mesh.dispose();
        });
        
    }
}