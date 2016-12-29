import { IGame } from '../../models/IGame'

export class Plane implements IGame {
    constructor(private scene:BABYLON.Scene, private canvas:HTMLCanvasElement) { 
        this.initGame();
    }

    render(){
        if (this.ship.ready && !this.ship.killed) {
            if(this.readyFunc)
                this.readyFunc();
            this.move();

            this.camera.position.z += this.ship.speed;
            this.ship.position.z += this.ship.speed;
            this.ground.position.z += this.ship.speed;
        }
        this.scene.render();
    }

    dispose(){
        this.scene.dispose();
    }

    readyFunc(){
        setInterval(()=>{this.box()}, 100);
        this.readyFunc = undefined;
    }

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

        this.ship = new Ship(this.scene);

        BABYLON.Tools.RegisterTopRootEvents([{
            name: "keydown",
            handler: (event:KeyboardEvent)=>{this.onKeyDown(event)}
        }, {
            name: "keyup",
            handler: (event:KeyboardEvent)=>{this.onKeyUp()}
        }]);

        
    }

    onKeyDown(evt:KeyboardEvent){
        if (evt.keyCode == 37) {
            this.ship.moveLeft = true;
            this.ship.moveRight = false;
        } else if (evt.keyCode == 39) {
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
        }
        if (this.ship.moveLeft) {
            this.ship.position.x += -1;
            this.camera.position.x += -1;
        }
    }

    randomNumber (min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
    }

    box() {
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
        var trigger = {trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: this.ship.mesh};
        var sba = new BABYLON.SwitchBooleanAction(trigger, this.ship, "killed");
        b.actionManager.registerAction(sba);
    // To be continued
    }
}

class Ship{
    constructor(scene:BABYLON.Scene){
        BABYLON.SceneLoader.ImportMesh("", "assets/plane/", "ship.babylon", scene, (meshes) => {
            const m = meshes[0];
            
            m.isVisible = true; 
            m.scaling = new BABYLON.Vector3(5,5,5); 
            m.position.y = 2;
            m.position.x = 0;
            m.position.z = 0;

            m.rotation.y = Math.PI;
            this.shipMesh = m;
            this.speed = 3;
            this.ready = true;
        });
    }
    get position():BABYLON.Vector3{
        if(!this.shipMesh)
            return BABYLON.Vector3.Zero();

        return this.shipMesh.position;
    }

    get mesh():BABYLON.Mesh{
        return this.mesh;
    }

    ready:boolean;
    shipMesh:BABYLON.AbstractMesh
    killed:boolean;
    ammo:number;
    speed:number;
    moveLeft:boolean;
    moveRight:boolean;
}