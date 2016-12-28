import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toadattack',
  templateUrl: './toadattack.component.html',
  styleUrls: ['./toadattack.component.css']
})
export class ToadattackComponent implements OnInit {

  constructor() { }

scene:BABYLON.Scene = null;
camera:BABYLON.UniversalCamera = null;
score:number = 0;
  ngOnInit(): void { 
    var canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    var engine = new BABYLON.Engine(canvas, true);

    this.scene = new BABYLON.Scene(engine);

    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    this.camera = new BABYLON.UniversalCamera('camera1', new BABYLON.Vector3(0,4,-10), this.scene);
    
    this.camera.setTarget(BABYLON.Vector3.Zero());

    this.camera.attachControl(canvas, false);

    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);

    engine.runRenderLoop(() => {
      this.scene.render();

        this.ENEMIES.forEach(function (shroom) {
        //if (shroom.killed) {
            // Nothing to do here
        //} else {
            shroom.position.z -= 0.5;
        //}

        
      });
      this.cleanShrooms();
    });
    
    window.addEventListener("resize", () => {
      engine.resize();
    });

    this.initgame();
  }

    private readonly LANE_NUMBER = 3;
    private readonly LANE_INTERVAL = 5;
    private readonly LANES_POSITIONS = [];
    private readonly ENDINGS = [];
    private TOAD_MODEL:BABYLON.AbstractMesh;
    private ENEMIES:BABYLON.AbstractMesh[] = [];

  initgame(){

    var currentLanePosition = this.LANE_INTERVAL * -1 * (this.LANE_NUMBER/2);
    var ground = new BABYLON.StandardMaterial("ground", this.scene);
    var texture = new BABYLON.Texture("assets/toadattack/ground.jpg", this.scene);
    texture.uScale = 40;
    texture.vScale = 2;
    ground.diffuseTexture = texture;    

    for (var i = 0; i<this.LANE_NUMBER; i++){
        this.LANES_POSITIONS[i] = currentLanePosition;
        this.createLane(i, currentLanePosition, ground, this.scene);
        var e = this.createEnding(i, currentLanePosition, this.scene);
        this.ENDINGS.push(e);
        currentLanePosition += this.LANE_INTERVAL;
    } 

    this.camera.position.x = this.LANES_POSITIONS[Math.floor(this.LANE_NUMBER/2)];

    BABYLON.SceneLoader.ImportMesh("red_toad", "assets/toadattack/", "toad.babylon", this.scene, (meshes) => {
        var m = meshes[0];
        m.isVisible = false;
        m.scaling = new BABYLON.Vector3(0.5,0.5,0.5);
        this.TOAD_MODEL = m;
    });

    // The box creation
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, this.scene);

    // The sky creation
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/toadattack/cubemap/", this.scene); 
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    // box + sky = skybox !
    skybox.material = skyboxMaterial;

    setInterval(()=>{this.createEnemy();}, 1000);
    window.addEventListener("keydown", (event:KeyboardEvent)=>{this.onKeyDown(event);});
  }

  cleanShrooms() {
      // For all clones
      for (var n=0; n<this.ENEMIES.length; n++) {
          // The mushrooms has been killed !
          if ((this.ENEMIES[n] as any).killed) {
              var shroom = this.ENEMIES[n];
              // Destroy the clone !
              shroom.dispose();
              this.ENEMIES.splice(n, 1);
              n--;
              // Add one point to the score
              this.score += 1;
          }
          // The mushrooms is behind the camera
          else if (this.ENEMIES[n].position.z < -10) {
              var shroom = this.ENEMIES[n];
              // Destroy the clone !
              shroom.dispose();
              this.ENEMIES.splice(n, 1);
              n--;
              // Remove one point to the score
              this.score -= 1;
          }
      }
  }

  createLane(id:number, position:number, ground:BABYLON.Material, scene:BABYLON.Scene){
    const lane = BABYLON.Mesh.CreateBox("lane"+id, 1, scene);
    lane.scaling.y = 0.1;
    lane.scaling.x = 3;
    lane.scaling.z = 800;
    lane.position.x = position;
    lane.position.z = lane.scaling.z/2-200;
    lane.material = ground;
  }

  createEnding(id:number, position:number, scene:BABYLON.Scene) {
        const ending = BABYLON.Mesh.CreateGround(String(id), 3, 4, 1, scene);
        ending.position.x = position;
        ending.position.y = 0.1;
        ending.position.z = 1;
        const mat = new BABYLON.StandardMaterial("endingMat", scene);
        mat.diffuseColor = new BABYLON.Color3(0.8,0.2,0.2);
        ending.material = mat;
        return ending;
    }

  createEnemy() {
    // The starting position of toads
    var posZ = 100;

    // Get a random lane
    var posX = this.LANES_POSITIONS[Math.floor(Math.random() * this.LANE_NUMBER)];

    // Create a clone of our template
    var shroom = this.TOAD_MODEL.clone(this.TOAD_MODEL.name, null);

    shroom.id = this.TOAD_MODEL.name+(this.ENEMIES.length+1);
    // Our toad has not been killed yet !
    //shroom.killed = false;
    // Set the shroom visible
    shroom.isVisible = true;
    // Update its position
    shroom.position = new BABYLON.Vector3(posX, shroom.position.y/2, posZ);
    this.ENEMIES.push(shroom);
}

animateEnding (ending) {
    // Get the initial position of our mesh
    var posY = ending.position.y;
    // Create the Animation object
    var animateEnding = new BABYLON.Animation(
    "animateEnding",
    "position.y",
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

    // Animations keys
    var keys = [];
    keys.push({
        frame: 0,
        value: posY
    },{
        frame: 5,
        value: posY+0.5
    },{
        frame: 10,
        value: posY
    });

    // Add these keys to the animation
    animateEnding.setKeys(keys);

    // Link the animation to the mesh
    ending.animations.push(animateEnding);

    // Run the animation !
    this.scene.beginAnimation(ending, 0, 10, false, 1);

}

getToadOnEnding(ending) {
    // for each mushroom
    for (var i=0; i<this.ENEMIES.length; i++){
        var shroom = this.ENEMIES[i];
        // Check if the shroom is on the good lane
        if (shroom.position.x === ending.position.x) {

            // Check if the shroom is ON the ending
            var diffSup = ending.position.z + 3;
            var diffInf = ending.position.z - 3;

            if (shroom.position.z > diffInf && shroom.position.z < diffSup ) {
                return shroom;
            }
        }
    }
    return null;
}

onKeyDown(evt) {
    var currentEnding = -1;
    switch (evt.keyCode) {
        case 65 : //'A'
            currentEnding = 0;
            break;
        case 87 : //'Z'
            currentEnding = 1;
            break;
        case 68 : //'E'
            currentEnding = 2;
            break;
    }
    if (currentEnding != -1) {
    this.animateEnding(this.ENDINGS[currentEnding]);
    var shroom = this.getToadOnEnding(this.ENDINGS[currentEnding]);
    if (shroom) {
        // Kill !
        (shroom as any).killed = true;
    }
}
}
    //https://drive.google.com/open?id=0Bxtq6_UKmzkYemVUcFZiZjM2blk
    //https://drive.google.com/file/d/0Bxtq6_UKmzkYc2l1TFQ0UUtFaW8
}
