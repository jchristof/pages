export class ParticleSystem {
    static createParticles(scene:BABYLON.Scene):BABYLON.AbstractMesh{
        
        let emitter = BABYLON.Mesh.CreateBox("emitter", 0.00001, scene);
        var particleSystem = new BABYLON.ParticleSystem("particles", 20000, scene);
        emitter.position.y=0;
        emitter.position.x=0;
        emitter.position.z=30;
        particleSystem.particleTexture = new BABYLON.Texture("assets/plane/star.png", scene);
        particleSystem.emitRate = 15000;
        particleSystem.emitter = emitter;
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

        return emitter;
    }
}