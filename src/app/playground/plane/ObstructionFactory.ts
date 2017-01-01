import { Ship } from './Ship'

export class ObstructionFactory{
    constructor(scene:BABYLON.Scene, camera:BABYLON.Camera, ship:Ship){
        this.scene = scene;
        this.camera = camera;
        this.ship = ship;

        this.obstuctionMaterial = new BABYLON.StandardMaterial("obstructionMaterial", scene);
        this.obstuctionMaterial.diffuseColor = BABYLON.Color3.FromInts(51, 102, 153);
        this.obstuctionMaterial.emissiveColor = new BABYLON.Color3(1,1,1);
        this.obstuctionMaterial.alpha = .8;
    }

    private ship:Ship;
    private scene:BABYLON.Scene;
    private camera:BABYLON.Camera;
    private obstuctionMaterial:BABYLON.StandardMaterial;

    randomRange(min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
    }

    newObstruction(){
        this.scene.meshes.forEach(mesh=>{
           if(mesh.id === "obstruction" && mesh.position.z < this.camera.position.z)
               mesh.dispose();
        });
        
        var minZ = this.camera.position.z+500;
        var maxZ = this.camera.position.z+1500;
        var minX = this.camera.position.x - 100, maxX = this.camera.position.x+100;
        var minSize = 2, maxSize = 10;
        
        var randomX, randomZ, randomSize;

        randomX = this.randomRange(minX, maxX);
        randomZ = this.randomRange(minZ, maxZ);
        randomSize = this.randomRange(minSize, maxSize);

        var b = BABYLON.Mesh.CreateBox("obstruction", randomSize, this.scene);

        b.scaling.x = this.randomRange(0.5, 1.5);
        b.scaling.y = this.randomRange(4, 8);
        b.scaling.z = this.randomRange(2, 3);

        b.position.x = randomX;
        b.position.y = b.scaling.y/2 ;
        b.position.z = randomZ;

        b.material = this.obstuctionMaterial;
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
    }
}