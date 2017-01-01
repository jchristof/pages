export class Ship{
    constructor(scene:BABYLON.Scene, camera:BABYLON.Camera, particalSystem:BABYLON.AbstractMesh){
        this.killed = false;
        this.scene = scene;
        BABYLON.SceneLoader.ImportMesh("", "assets/plane/", "ship2.babylon", scene, (meshes) => {
            const m = meshes[0];

            m.rotation.y = Math.PI/2;
            this.speed = 3;
            this.ready = true;
  
            this.shipMesh = BABYLON.Mesh.CreateBox("ship", 2, this.scene);
            this.shipMesh.isVisible = false;
            m.parent = this.shipMesh;
            particalSystem.parent = this.shipMesh;
            particalSystem.position.z = 30;
            
            let shipMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
            shipMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
            shipMaterial.alpha = .5;
            m.material = shipMaterial;
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

        if(Math.abs(this.shipMesh.rotation.z) - .05 < 0){
            this.shipMesh.rotation.z = 0;
            return;
        }
        
        if(this.shipMesh.rotation.z < 0)
            this.shipMesh.rotation.z += .05;
        else
            this.shipMesh.rotation.z -= .05;
    }

    rollLeft(){
        if( this.shipMesh.rotation.z < Math.PI/8)
            this.shipMesh.rotation.z += .01;
    }

    rollRight(){
        if( this.shipMesh.rotation.z > -Math.PI/8)
            this.shipMesh.rotation.z -= .01;
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