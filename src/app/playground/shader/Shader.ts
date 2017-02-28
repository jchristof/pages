import { IGame } from '../../../models/IGame'
import { GameState } from '../../../models/GameState'
import { Shader1 } from "./Shader1"
import { ShSkyBox } from "./ShSkyBox"

export class Shader implements IGame{
    constructor(scene:BABYLON.Scene, canvas:HTMLCanvasElement){
        this.scene = scene;
        this.camera = this.createCamera(scene);
        this.camera.attachControl(canvas);
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);

        this.skybox = new ShSkyBox(scene, canvas as BABYLON.ISize);
        this.resizeListner = ()=>{
            this.skybox.resize(canvas as BABYLON.ISize);
        };
        window.addEventListener('resize', this.resizeListner);
    }

    private scene:BABYLON.Scene;
    private state:GameState;
    private camera:BABYLON.Camera;
    private skybox:ShSkyBox;
    private resizeListner:()=>void;

    private createCamera(scene:BABYLON.Scene):BABYLON.Camera{
        const camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 5, -15), scene);
        camera.setTarget(new BABYLON.Vector3(0,0,20));
        //camera.attachControl(this.canvas);
        return camera
    }

    render(){
        switch(this.state){
        }
 
        this.scene.render();
    }

    dispose(){
        this.scene.dispose();
        window.removeEventListener('resize', this.resizeListner);
    }
}