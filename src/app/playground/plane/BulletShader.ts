export class BulletShader{
    constructor(scene:BABYLON.Scene, size:BABYLON.ISize){
        BABYLON.Effect.ShadersStore["customVertexShader"]=`
            precision mediump float;

            // Attributes
            attribute vec3 position;
            attribute vec2 uv;

            // Uniforms
            uniform mat4 worldViewProjection;

            // Varying
            varying vec2 vUV;
            varying vec3 vPosition;

            void main(void) {
                gl_Position = worldViewProjection * vec4(position, 1.0);

                vUV = uv;
                vPosition = position;
            }
            `

        BABYLON.Effect.ShadersStore["customFragmentShader"]=`

#ifdef GL_ES
precision mediump float;
#endif
#extension GL_OES_standard_derivatives : enable

#define dist(x,y) (sqrt(x*x + y* y))
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

vec3 hsv2rgb(vec3 c) {//https://github.com/hughsk/glsl-hsv2rgb
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}



void main( void ) {
	vec2 p = ( gl_FragCoord.xy );
	/*p = p * 2.0;
	p.x -= resolution.x;
	p.y -= resolution.y;
	//p.x *= resolution.x / resolution.y;
	*/
	
	float color = 
		(sin(p.x/125.0-time)+1.0)
	      + (sin(p.y/125.0-time)+1.0)
	      + (sin(p.x+p.y)+1.0)
		;
	
	color = mod(color,4.0)+time;
	
	color = color*0.8;
	
	vec3 hsv = hsv2rgb(vec3(color,1,1));
	gl_FragColor = vec4( hsv , 1.0 );	
}

            `
        const shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
                vertex: "custom",
                fragment: "custom",
            },
            {
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "time", "resolution"]
            });

       // var refTexture = new BABYLON.Texture("/CYOS/ref.jpg", scene);
       // refTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
       // refTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;

        //var mainTexture = new BABYLON.Texture("/CYOS/amiga.jpg", scene);

       // shaderMaterial.setTexture("textureSampler", mainTexture);
       // shaderMaterial.setTexture("refSampler", refTexture);
        shaderMaterial
        let time = 0
        var timeinterval = setInterval(()=>{
            time+=.01;
            shaderMaterial.setFloat("time", time);
        },10);
        
        shaderMaterial.setVector2("mouse", new BABYLON.Vector2(100, 100));
        shaderMaterial.setVector2("resolution", new BABYLON.Vector2(1000, 1000));
        shaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
        shaderMaterial.backFaceCulling = false;

        this.shaderMaterial = shaderMaterial;
    }

    resize(size:BABYLON.ISize){
        this.shaderMaterial.setVector2("resolution", new BABYLON.Vector2(size.width, size.height));
    }

    private shaderMaterial:BABYLON.ShaderMaterial;

    get shader():BABYLON.ShaderMaterial{
        return this.shaderMaterial;
    }

    dispose():void{
        BABYLON.Effect.ShadersStore["customVertexShader"] = undefined;
        BABYLON.Effect.ShadersStore["customFragmentShader"] = undefined;
        this.shaderMaterial.dispose();
    }
}