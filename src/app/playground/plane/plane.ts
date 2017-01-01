import { IGame } from '../../../models/IGame'
import { GameState } from '../../../models/GameState'
import { SkyBox } from './SkyBox'
import { GameController } from './GameController'
import { Ship } from './Ship'
import { ObstructionFactory } from './ObstructionFactory'
import { ParticleSystem } from './ParticleSystem'

export class Plane implements IGame {
    constructor(private scene:BABYLON.Scene, private canvas:HTMLCanvasElement) { 
        //scene.debugLayer.show();
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
        scene.fogDensity = 0.005;
        
        this.state = GameState.Init;
        this.camera = this.createCamera(scene);
        this.createLights();

        this.ship = new Ship(this.scene, this.camera, ParticleSystem.createParticles(scene));
        this.gameController = new GameController(this.ship);

        this.keyboardEvents();
        
        this.skybox = new SkyBox(scene, canvas as BABYLON.ISize);
        this.obstructionFactory = new ObstructionFactory(scene, this.camera, this.ship);
    };

    private createCamera(scene:BABYLON.Scene):BABYLON.Camera{
        const camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 5, -15), scene);
        camera.setTarget(new BABYLON.Vector3(0,0,20));
        camera.maxZ = 1000;
        camera.speed = 4;
        //camera.attachControl(this.canvas);
        return camera
    }

    private createLights():void{
        const h = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 0.5, 0), this.scene);
        h.intensity = 0.6;

        // A directional light to add some colors
        const d = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(0,-0.5,0.5), this.scene);
        d.position = new BABYLON.Vector3(0.1,100,-100);
        d.intensity = 0.4;
        // Purple haze, all around !
        d.diffuse = BABYLON.Color3.FromInts(204,196,255);
    }

    private keyboardEvents(){

        this.events = [
            {
                name: "keydown",
                handler: (event:KeyboardEvent)=>{this.onKeyDown(event)}
            }, 
            {
                name: "keyup",
                handler: (event:KeyboardEvent)=>{this.onKeyUp()}
            },
            {
                name: "resize",
                handler: (event:UIEvent)=>{
                    this.canvas.width;
                    this.skybox.resize(this.canvas as BABYLON.ISize);
                }
            }
            
            ]
            BABYLON.Tools.RegisterTopRootEvents(this.events);
    }

    events:Array<any>

    render(){
        switch(this.state){
            case GameState.Init:
                if(this.ship.shipMesh){
                    this.timer = setInterval(()=>{this.obstructionFactory.newObstruction();}, 100);
                    
                    this.state = GameState.Update;
                }
                break;
            case GameState.Update:
                this.move();                  
                this.camera.position.z += this.ship.speed;
                this.ship.position.z += this.ship.speed;

                break;
            case GameState.End:
                clearInterval(this.timer);
                break;
        }
 
        this.scene.render();
    }

    dispose(){
        this.gameController.dispose();
        this.skybox.dispose();
        this.scene.dispose();
        BABYLON.Tools.UnregisterTopRootEvents(this.events);
    }

    private obstructionFactory:ObstructionFactory;
    private skybox:SkyBox;
    private state:GameState;
    private xgamePad:BABYLON.Xbox360Pad;
    private gameController:GameController;
    private timer:NodeJS.Timer;
    private fountain:BABYLON.AbstractMesh;
    private ship:Ship;
    private camera:BABYLON.Camera;

    onKeyDown(evt:KeyboardEvent){
        if (evt.keyCode == 37 || evt.keyCode == 65) {
            this.ship.moveLeft = true;
            this.ship.moveRight = false;
        } else if (evt.keyCode == 39 || evt.keyCode == 68) {
            this.ship.moveRight = true;
            this.ship.moveLeft = false;
        }
    }

    onKeyUp(){
        this.ship.moveRight = false;
        this.ship.moveLeft = false;
    }

    move(){
        if (this.ship.moveRight) {
            this.ship.position.x += 1;
            this.camera.position.x += 1;
            this.ship.rollRight();
            return;
        }
        if (this.ship.moveLeft) {
            this.ship.position.x += -1;
            this.camera.position.x += -1;
            this.ship.rollLeft();
            return;
        }

        this.ship.rollcenter();
    }
}