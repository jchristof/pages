import { IGame } from '../../models/IGame'
import { GameState } from '../../models/GameState'

export class Plane implements IGame {
    constructor(private scene:BABYLON.Scene, private canvas:HTMLCanvasElement) { 
        this.initGame();
        scene.debugLayer.show();
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
        scene.fogDensity = 0.005;
        
        this.state = GameState.Init;

        this.gamepads = new BABYLON.Gamepads((gamePad)=>{     
            this.xgamePad = gamePad as BABYLON.Xbox360Pad;
            this.xgamePad.onleftstickchanged((values:BABYLON.StickValues)=>{
                if(values.x<-.3){
                    this.ship.moveLeft = true;
                    this.ship.moveRight = false;
                    return;
                }
                else if(values.x>.3){
                    this.ship.moveLeft = false;
                    this.ship.moveRight = true;
                    return;
                }
                if(values.y > 0)
                    this.ship.position.z + .5;
                this.ship.moveLeft = false;
                this.ship.moveRight = false;
            });
            this.xgamePad.onbuttondown((buttonPressed:BABYLON.Xbox360Button)=>{

            })
        });
        (this.gamepads as any)._startMonitoringGamepads();
    };

    render(){
        switch(this.state){
            case GameState.Init:
                if(this.ship.shipMesh){
                    this.timer = setInterval(()=>{this.box()}, 100);
                    
                    this.state = GameState.Update;
                }
                break;
            case GameState.Update:
                this.move();                  
                this.camera.position.z += this.ship.speed;
                this.ship.position.z += this.ship.speed;
                this.ground.position.z += this.ship.speed;

                break;
            case GameState.End:
                clearInterval(this.timer);
                break;
        }
 
        this.scene.render();
    }

    dispose(){
        this.gamepads.dispose();
        this.scene.dispose();
    }

    readyFunc(){
        this.timer = setInterval(()=>{this.box()}, 100);
        this.readyFunc = undefined;
    }

    private state:GameState;
    private xgamePad:BABYLON.Xbox360Pad;
    private gamepads:BABYLON.Gamepads;
    private timer:NodeJS.Timer;
    private fountain:BABYLON.AbstractMesh;
    private ground:BABYLON.AbstractMesh;
    private ship:Ship;
    private camera:BABYLON.Camera;
    private initGame(){
        const camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 5, -15), this.scene);
        camera.setTarget(new BABYLON.Vector3(0,0,20));
        camera.maxZ = 1000;
        camera.speed = 4;
        //camera.attachControl(this.canvas);
        this.camera = camera;
        const h = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 0.5, 0), this.scene);
        h.intensity = 0.6;

        // A directional light to add some colors
        var d = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(0,-0.5,0.5), this.scene);
        d.position = new BABYLON.Vector3(0.1,100,-100);
        d.intensity = 0.4;
        // Purple haze, all around !
        d.diffuse = BABYLON.Color3.FromInts(204,196,255);

        // ground
        this.ground = BABYLON.Mesh.CreateGround("ground", 800, 2000, 2, this.scene);
        this.ground.isVisible = false;

        this.ship = new Ship(this.scene, camera, this.particleFountain());

        BABYLON.Tools.RegisterTopRootEvents([{
            name: "keydown",
            handler: (event:KeyboardEvent)=>{this.onKeyDown(event)}
        }, {
            name: "keyup",
            handler: (event:KeyboardEvent)=>{this.onKeyUp()}
        }]);

        
    }

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

    randomNumber (min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
    }

    particleFountain():BABYLON.AbstractMesh{
        this.fountain = BABYLON.Mesh.CreateBox("fountain", 0.00001, this.scene);
        var particleSystem = new BABYLON.ParticleSystem("particles", 20000, this.scene);
        this.fountain.position.y=0;
        this.fountain.position.x=0;
        this.fountain.position.z=30;
        particleSystem.particleTexture = new BABYLON.Texture("assets/plane/star.png", this.scene);
        particleSystem.emitRate = 15000;
        particleSystem.emitter = this.fountain;
        particleSystem.minEmitBox = new BABYLON.Vector3(30, -30, 30); // Starting all From
        particleSystem.maxEmitBox = new BABYLON.Vector3(-30, 30, -30); // To...
        particleSystem.minSize = 0.01;
        particleSystem.maxSize = 0.3;

        particleSystem.textureMask = new BABYLON.Color4(1, 1, 1, 1);

        particleSystem.maxLifeTime = 2;

        particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);
        particleSystem.direction1 = new BABYLON.Vector3(-2, -2, -2);
        particleSystem.direction2 = new BABYLON.Vector3(2, 2, 2);



        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 1;

        particleSystem.updateSpeed = 0.001;
        // Start the particle system
        particleSystem.start();

        return this.fountain;
    }

    box() {
        this.scene.meshes.forEach(mesh=>{
           if(mesh.id === "bb" && mesh.position.z < this.camera.position.z)
               mesh.dispose();
        })
        var minZ = this.camera.position.z+500;
        var maxZ = this.camera.position.z+1500;
        var minX = this.camera.position.x - 100, maxX = this.camera.position.x+100;
        var minSize = 2, maxSize = 10;

        var randomX, randomZ, randomSize;

        randomX = this.randomNumber(minX, maxX);
        randomZ = this.randomNumber(minZ, maxZ);
        randomSize = this.randomNumber(minSize, maxSize);

        var b = BABYLON.Mesh.CreateBox("bb", randomSize, this.scene);

        b.scaling.x = this.randomNumber(0.5, 1.5);
        b.scaling.y = this.randomNumber(4, 8);
        b.scaling.z = this.randomNumber(2, 3);

        b.position.x = randomX;
        b.position.y = b.scaling.y/2 ;
        b.position.z = randomZ;

        b.actionManager = new BABYLON.ActionManager(this.scene);
        var trigger = {trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter:this.ship.shipMesh};
       // var sba = new BABYLON.SwitchBooleanAction(trigger, this.ship, "killed");

        var onCollideAction = new BABYLON.ExecuteCodeAction(
            trigger,
            (evt) => {
                //this.ship.killed = true;
                //this.state = GameState.End;
            },
            condition);

        b.actionManager.registerAction(onCollideAction);

        var condition = new BABYLON.ValueCondition(b.actionManager, this.ship, "ammo", 0, BABYLON.ValueCondition.IsGreater);
        var onpickAction = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function(evt) {
                if (evt.meshUnderPointer) {
                    // Find the clicked mesh
                    var meshClicked = evt.meshUnderPointer;
                    // Detroy it !
                    meshClicked.dispose();
                    // Reduce the number of ammo by one
                    this.ship.ammo -= 1;
                    // Update the ammo label
                    this.ship.sendEvent();
                }
            },
            condition);

        b.actionManager.registerAction(onpickAction);

    // To be continued
    }
}

class Ship{
    constructor(scene:BABYLON.Scene, camera:BABYLON.Camera, particalSystem:BABYLON.AbstractMesh){
        this.killed = false;
        this.scene = scene;
        BABYLON.SceneLoader.ImportMesh("", "assets/plane/", "ship.babylon", scene, (meshes) => {
            const m = meshes[0];
            
            m.isVisible = true; 
            m.scaling = new BABYLON.Vector3(5,5,5); 

            m.rotation.y = Math.PI;
            this.speed = 3;
            this.ready = true;

                       
            this.shipMesh = BABYLON.Mesh.CreateBox("ship", 2, this.scene);
            this.shipMesh.isVisible = false;
            m.parent = this.shipMesh;
            particalSystem.parent = this.shipMesh;
            particalSystem.position.z = 30;
            
           // camera.parent = this.shipMesh;
        });
    }
    
    get position():BABYLON.Vector3{
        return this.shipMesh.position;
    }

    set moveLeft(value:boolean){
        this._moveLeft = value;
    }

    get moveLeft():boolean{
        return this._moveLeft;
    }

    rollcenter(){
        if(this.shipMesh.rotation.z === 0)
            return;

        if(Math.abs(this.shipMesh.rotation.z) - .1 < 0){
            this.shipMesh.rotation.z = 0;
            return;
        }
        
        if(this.shipMesh.rotation.z < 0)
            this.shipMesh.rotation.z += .1;
        else
            this.shipMesh.rotation.z -= .1;
    }

    rollLeft(){
        if( this.shipMesh.rotation.z < Math.PI/8)
            this.shipMesh.rotation.z += .1;
    }

    rollRight(){
        if( this.shipMesh.rotation.z > -Math.PI/8)
            this.shipMesh.rotation.z -= .1;
    }

    scene:BABYLON.Scene;
    rollAnimation:BABYLON.Animation;
    ammo:number = 1000;
    ready:boolean;
    shipMesh:BABYLON.AbstractMesh
    killed:boolean;

    speed:number;
    _moveLeft:boolean;
    moveRight:boolean;
}