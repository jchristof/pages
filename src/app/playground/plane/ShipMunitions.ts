import { Ship } from './Ship'
import { BulletShader } from './BulletShader'

export class ShipMunitions{
    constructor(scene:BABYLON.Scene, ship:Ship){
        this.scene = scene;
        this.ship = ship;
        this.bulletShader = new BulletShader(scene, null);
    }

    private bulletShader:BulletShader;

    private scene:BABYLON.Scene;
    private ship:Ship;
    shots:Array<BABYLON.AbstractMesh> = [];

    update():void{
        this.shots.forEach(shot =>{
            shot.position.z += this.ship.speed + 3;
        });
    }

    fireShot(){
        const shot = BABYLON.Mesh.CreateBox("shot", 1.5, this.scene);
        shot.material = this.bulletShader.shader;
        shot.scaling.z = 3.0;
        shot.position = this.ship.position.clone();
        shot.position.z += 1; 

        // shot.actionManager = new BABYLON.ActionManager(this.scene);
        // var trigger = {trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter:{ id:"obstruction"}};
        // let collideAction = new BABYLON.ExecuteCodeAction(trigger, (event:BABYLON.ActionEvent)=>{

        // })

        this.shots.push(shot);

    }
}