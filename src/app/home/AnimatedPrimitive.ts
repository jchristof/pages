export class AnimatedPrimitive{
    constructor(engine:BABYLON.Engine, scene:BABYLON.Scene, camera:BABYLON.Camera){
        this.engine = engine;
        this.scene = scene;
        this.camera = camera;
    }

    start():void{
        this.box = BABYLON.Mesh.CreatePlane("box",0, this.scene);  
        this.box.position = new BABYLON.Vector3(0,0,100);

        const material = new BABYLON.StandardMaterial("material", this.scene);
        this.box.material = material;
        this.box.material.alpha = .2;
       
        this.animate();
    }

    animate():void{
        let camera = this.camera;
        let distance = 100;
        const frustumHeight = 2.0 * distance * Math.tan(camera.fov * 0.5 /** (Math.PI/180)*/);
        const frustumWidth = frustumHeight * this.engine.getAspectRatio(camera);

        (this.box.material as BABYLON.StandardMaterial).diffuseColor = BABYLON.Color3.FromInts(Math.random()*255, Math.random()*255, Math.random()*255);

        this.box.position.y = (Math.random()*frustumHeight) - frustumHeight/2;
        this.box.position.x = (Math.random()*frustumWidth) - frustumWidth/2;

        this.xAnimation = new BABYLON.Animation("scalex", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        this.yAnimation = new BABYLON.Animation("scaley", "scaling.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        this.alphaAnimation = new BABYLON.Animation("alpha", "visibility", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

        var keys = []; 
        keys.push({
        frame: 0,
        value: 0
        });

        keys.push({
        frame: 60,
        value: 20
        });

        this.xAnimation.setKeys(keys);
        this.box.animations.push(this.xAnimation);

        this.yAnimation.setKeys(keys);
        this.box.animations.push(this.yAnimation);

        var alphaKeys = []; 
        alphaKeys.push({
        frame: 0,
        value: 1
        });

        alphaKeys.push({
        frame: 60,
        value: 0
        });

        this.alphaAnimation.setKeys(alphaKeys);
        this.box.animations.push(this.alphaAnimation);
        this.alphaAnimation

        this.scene.beginAnimation(this.box, 0, 60, false, 1, ()=>{
            this.animate();
        });
    }

    camera:BABYLON.Camera;
    box:BABYLON.AbstractMesh;
    scene:BABYLON.Scene;
    engine:BABYLON.Engine;

    xAnimation:BABYLON.Animation;
    yAnimation:BABYLON.Animation;

    alphaAnimation:BABYLON.Animation;
}