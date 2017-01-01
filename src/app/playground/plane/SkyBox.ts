import { SkyboxShader } from './SkyboxShader'

export class SkyBox{
    constructor(scene:BABYLON.Scene){
        let skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.infiniteDistance = true;
        this.skyboxShader = new SkyboxShader(scene);

        skybox.material = this.skyboxShader.shader;
        this.skybox = skybox;
    }

    private skybox:BABYLON.AbstractMesh;
    private skyboxShader:SkyboxShader;

    resize(){
        this.skyboxShader.resize();
    }
    dispose(){
        this.skybox.dispose();
        this.skyboxShader.shader.dispose();
        this.skyboxShader.dispose();
    }
}