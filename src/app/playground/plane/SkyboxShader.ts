export class SkyboxShader{
    constructor(scene:BABYLON.Scene){
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

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

	
float sdBox( vec3 p, vec3 b )
{
  vec3 d = abs(p) - b;
  return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}

float sdBox( vec2 p, vec2 b )
{
  vec2 d = abs(p) - b;
  return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}


vec3 nrand3( vec2 co )
{
	vec3 a = fract( cos( co.x*8.3e-3 + co.y )*vec3(1.3e5, 4.7e5, 2.9e5) );
	vec3 b = fract( sin( co.x*0.3e-3 + co.y )*vec3(8.1e5, 1.0e5, 0.1e5) );
	vec3 c = mix(a, b, 0.5);
	return c;
}

float map(vec3 p)
{
    float h = 1.;
    float rh = 0.1;
    float grid = 0.4;
    float grid_half = grid*.5;
    float cube = 0.175;
    vec3 orig = p;

    vec3 g1 = vec3(ceil((orig.x)/grid), ceil((orig.y)/grid), ceil((orig.z)/grid));
    vec3 rxz =  nrand3(g1.xz);
    vec3 ryz =  nrand3(g1.yz);

    p = -abs(p);
    vec3 di = ceil(p/4.8);
    p.y += di.x*1.0;
    p.x += di.y*1.2;
    p.xy = mod(p.xy, -4.8);

    vec2 gap = vec2(rxz.x*rh, ryz.y*rh);
    float d1 = p.y + h + gap.x;
    float d2 = p.x + h + gap.y;

    vec2 p1 = mod(p.xz, vec2(grid)) - vec2(grid_half);
    float c1 = sdBox(p1,vec2(cube));

    vec2 p2 = mod(p.yz, vec2(grid)) - vec2(grid_half);
    float c2 = sdBox(p2,vec2(cube));

    return max(max(c1,d1), max(c2,d2));
}



vec3 genNormal(vec3 p)
{
    const float d = 0.01;
    return normalize( vec3(
        map(p+vec3(  d,0.0,0.0))-map(p+vec3( -d,0.0,0.0)),
        map(p+vec3(0.0,  d,0.0))-map(p+vec3(0.0, -d,0.0)),
        map(p+vec3(0.0,0.0,  d))-map(p+vec3(0.0,0.0, -d)) ));
}

void main()
{
    vec2 pos = (gl_FragCoord.xy*2.0 - resolution.xy) / resolution.y;
    vec3 camPos = vec3(-0.5,0.0,3.0);
    vec3 camDir = normalize(vec3(0., 0.0, -1.0));
    camPos -=  vec3(0.0,0.0,time*3.0);
    vec3 camUp  = normalize(vec3(1.0, .0, 0.0));
    vec3 camSide = cross(camDir, camUp);
    float focus = 1.8;

    vec3 rayDir = normalize(camSide*pos.x + camUp*pos.y + camDir*focus);	    
    vec3 ray = camPos;
    int march = 0;
    float d = 0.0;

    float total_d = 0.0;
    const int MAX_MARCH = 64;
    const float MAX_DIST = 100.0;
    for(int mi=0; mi<MAX_MARCH; ++mi) {
        d = map(ray);
        march=mi;
        total_d += d;
        ray += rayDir * d;
        if(d<0.001) {break; }
        if(total_d>MAX_DIST) {
            total_d = MAX_DIST;
            march = MAX_MARCH-1;
            break;
        }
    }
	
    float glow = 0.0;

    float fog = min(1.0, (1.0 / float(MAX_MARCH)) * float(march))*1.0;
    vec3  fog2 = 0.01 * vec3(3, 4, 5) * total_d;
    gl_FragColor = vec4(vec3(0.15, 0.15, 3)*fog + fog2, 1.0);
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
        shaderMaterial.setVector2("resolution", new BABYLON.Vector2(screen.width, screen.height));
        shaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
        shaderMaterial.backFaceCulling = false;

        this.shaderMaterial = shaderMaterial;
    }

    resize(){
        this.shaderMaterial.setVector2("resolution", new BABYLON.Vector2(screen.width, screen.height));
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