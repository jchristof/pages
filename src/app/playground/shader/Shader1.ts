export class Shader1{
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
                gl_Position = worldViewProjection * (vec4(position, 1.0) * vec4(.5, .5, .5, .5));

                vUV = uv;
                vPosition = position;
            }
        `

        BABYLON.Effect.ShadersStore["customFragmentShader"]=`
            #define PI 3.14159265359
            #define TWOPI 6.28318530718

            precision mediump float;
            uniform vec2 resolution;

            vec4 stripe(vec2 fragcoord){
                vec3 color1 = vec3(0.886, 0.576, 0.898);
                vec3 color2 = vec3(0.537, 0.741, 0.408);

                return vec4(mod(fragcoord.x, 20.0) < 10.0 ? color1 : color2, 1.0);               
            }

            vec4 stripe2(vec2 fragcoord, vec2 rez){
                vec3 color1 = vec3(0.741, 0.635, 0.471);
                vec3 color2 = vec3(0.192, 0.329, 0.439);
                vec3 pixel = ( fragcoord.x > rez.x / 2.0 ) ? color1 : color2;
	
                return vec4(pixel, 1.0);
            }

            vec4 stripe3(vec2 fragCoord, vec2 rez){
                vec2 r = vec2( fragCoord.xy / rez.xy );

                vec3 color1 = vec3(0.841, 0.582, 0.594);
                vec3 color2 = vec3(0.884, 0.850, 0.648);
                vec3 color3 = vec3(0.348, 0.555, 0.641);
                vec3 pixel;

                if( r.x < 1.0/3.0) {
                    pixel = color1;
                } 
                else if( r.x < 2.0/3.0 ) {
                    pixel = color2;
                } 
                else {
                    pixel = color3;
                }
	
                return vec4(pixel, 1.0);
            }

            vec4 stripe4(vec2 fragCoord, vec2 rez){
                vec2 r = vec2( fragCoord.xy / rez.xy );

                vec3 backgroundColor = vec3(1.0);
                vec3 color1 = vec3(0.216, 0.471, 0.698);
                vec3 color2 = vec3(1.00, 0.329, 0.298);
                vec3 color3 = vec3(0.867, 0.910, 0.247);

                vec3 pixel = backgroundColor;

                float leftCoord = 0.54;
                float rightCoord = 0.55;
                if( r.x < rightCoord && r.x > leftCoord ) pixel = color1;

                float lineCoordinate = 0.4;
                float lineThickness = 0.003;
                if(abs(r.x - lineCoordinate) < lineThickness) pixel = color2;

                if(abs(r.y - 0.6)<0.01) pixel = color3;
                return vec4(pixel, 1.0);
            }

            vec4 stripe5(vec2 fragCoord, vec2 rez){
               	vec2 r = vec2( fragCoord.xy / rez.xy );
	
                vec3 backgroundColor = vec3(1.0);
                vec3 axesColor = vec3(0.0, 0.0, 1.0);
                vec3 gridColor = vec3(0.5);

                // start by setting the background color. If pixel's value
                // is not overwritten later, this color will be displayed.
                vec3 pixel = backgroundColor;
                
                // Draw the grid lines
                // we used "const" because loop variables can only be manipulated
                // by constant expressions.
                const float tickWidth = 0.1;
                for(float i=0.0; i<1.0; i+=tickWidth) {
                    // "i" is the line coordinate.
                    if(abs(r.x - i)<0.002) pixel = gridColor;
                    if(abs(r.y - i)<0.002) pixel = gridColor;
                }
                // Draw the axes
                if( abs(r.x)<0.005 ) pixel = axesColor;
                if( abs(r.y)<0.006 ) pixel = axesColor;
                
                return vec4(pixel, 1.0);
            }

            vec4 stripe6(vec2 fragCoord, vec2 rez){
                vec2 r = vec2( fragCoord.xy - 0.5*rez.xy );
                // [0, rez.x] -> [-0.5*rez.x, 0.5*rez.x]
                // [0, rez.y] -> [-0.5*rez.y, 0.5*rez.y]
                r = 2.0 * r.xy / rez.xy;
                // [-0.5*rez.x, 0.5*rez.x] -> [-1.0, 1.0]
                
                vec3 backgroundColor = vec3(1.0);
                vec3 axesColor = vec3(0.0, 0.0, 1.0);
                vec3 gridColor = vec3(0.5);

                // start by setting the background color. If pixel's value
                // is not overwritten later, this color will be displayed.
                vec3 pixel = backgroundColor;
                
                // Draw the grid lines
                // This time instead of going over a loop for every pixel
                // we'll use mod operation to achieve the same result
                // with a single calculation (thanks to mikatalk)
                const float tickWidth = 0.1;
                if( mod(r.x, tickWidth) < 0.008 ) pixel = gridColor;
                if( mod(r.y, tickWidth) < 0.008 ) pixel = gridColor;
                // Draw the axes
                if( abs(r.x)<0.006 ) pixel = axesColor;
                if( abs(r.y)<0.007 ) pixel = axesColor;
                
                return vec4(pixel, 1.0);
            }

            vec4 stripe7(vec2 fragCoord, vec2 rez){
                vec2 r = vec2( fragCoord.xy - 0.5*rez.xy );
                r = 2.0 * r.xy / rez.y;
                // instead of dividing r.x to iResolution.x and r.y to iResolution.y
                // divide both of them to iResolution.y.
                // This way r.y will be in [-1.0, 1.0]
                // and r.x will depend on the frame size. I guess the non-full screen
                // mode rx will be in [-1.78, 1.78], and in full screen mode
                // for my laptop, it will be in [-1.6, 1.6] (1440./900.=1.6)
                
                vec3 backgroundColor = vec3(1.0);
                vec3 axesColor = vec3(0.0, 0.0, 1.0);
                vec3 gridColor = vec3(0.5);

                vec3 pixel = backgroundColor;
                
                // Draw grid lines
                const float tickWidth = 0.1;
                for(float i=-2.0; i<2.0; i+=tickWidth) {
                    // "i" is the line coordinate.
                    if(abs(r.x - i)<0.004) pixel = gridColor;
                    if(abs(r.y - i)<0.004) pixel = gridColor;
                }
                // Draw the axes
                if( abs(r.x)<0.006 ) pixel = axesColor;
                if( abs(r.y)<0.007 ) pixel = axesColor;
                
                return vec4(pixel, 1.0);
            }

            void make_disk(vec2 r, vec2 center, float radius, vec3 color, inout vec3 pixel) {
                if( length(r-center) < radius) {
                    pixel = color;
                }
            }

            vec4 disc(vec2 fragCoord, vec2 rez){
                vec2 r =  2.0*vec2(fragCoord.xy - 0.5*rez.xy)/rez.y;
                
                vec3 bgCol = vec3(0.3);
                vec3 col1 = vec3(0.216, 0.471, 0.698); // blue
                vec3 col2 = vec3(1.00, 0.329, 0.298); // yellow
                vec3 col3 = vec3(0.867, 0.910, 0.247); // red

                vec3 pixel = bgCol;
                
                make_disk(r, vec2(0.1, 0.3), 0.5, col3, pixel);
                make_disk(r, vec2(-0.8, -0.6), 1.5, col1, pixel);
                make_disk(r, vec2(0.8, 0.0), .15, col2, pixel);
                
                return vec4(pixel, 1.0);
            }

            vec4 step1(vec2 fragCoord, vec2 rez){
                vec2 r =  2.0*vec2(fragCoord.xy - 0.5*rez.xy)/rez.y;
                float xMax = rez.x/rez.y;
                
                vec3 bgCol = vec3(0.0); // black
                vec3 col1 = vec3(0.216, 0.471, 0.698); // blue
                vec3 col2 = vec3(1.00, 0.329, 0.298); // yellow
                vec3 col3 = vec3(0.867, 0.910, 0.247); // red

                vec3 pixel = bgCol;
                
                float edge, variable, ret;
                
                // divide the screen into five parts horizontally
                // for different examples
                if(r.x < -0.6*xMax) { // Part I
                    variable = r.y;
                    edge = 0.2;
                    if( variable > edge ) { // if the "variable" is greater than "edge"
                        ret = 1.0;          // return 1.0
                    } else {                // if the "variable" is less than "edge"
                        ret = 0.0;          // return 0.0
                    }
                } 
                else if(r.x < -0.2*xMax) { // Part II
                    variable = r.y;
                    edge = -0.2;
                    ret = step(edge, variable); // step function is equivalent to the
                                                // if block of the Part I
                } 
                else if(r.x < 0.2*xMax) { // Part III
                    // "step" returns either 0.0 or 1.0.
                    // "1.0 - step" will inverse the output
                    ret = 1.0 - step(0.5, r.y); // Mirror the step function around edge
                } 
                else if(r.x < 0.6*xMax) { // Part IV
                    // if y-coordinate is smaller than -0.4 ret is 0.3
                    // if y-coordinate is greater than -0.4 ret is 0.3+0.5=0.8
                    ret = 0.3 + 0.5*step(-0.4, r.y);
                }
                else { // Part V
                    // Combine two step functions to create a gap
                    ret = step(-0.3, r.y) * (1.0 - step(0.2, r.y));
                    // "1.0 - ret" will create a gap
                }
                
                pixel = vec3(ret); // make a color out of return value.
                return vec4(pixel, 1.0);
            }

            vec4 clamp1(vec2 fragCoord, vec2 rez){
                vec2 r =  2.0*vec2(fragCoord.xy - 0.5*rez.xy)/rez.y;
                vec2 p = vec2(fragCoord.xy / rez.xy);
                // use [0,1] coordinate system for this example
                
                vec3 bgCol = vec3(0.0); // black
                vec3 col1 = vec3(0.216, 0.471, 0.698); // blue
                vec3 col2 = vec3(1.00, 0.329, 0.298); // yellow
                vec3 col3 = vec3(0.867, 0.910, 0.247); // red

                vec3 pixel = bgCol;
                
                float edge, variable, ret;
                
                // divide the screen into four parts horizontally for different
                // examples
                if(p.x < 0.25) { // Part I
                    ret = p.y; // the brightness value is assigned the y coordinate
                            // it'll create a gradient
                } 
                else if(p.x < 0.5) { // Part II
                    float minVal = 0.3; // implementation of clamp
                    float maxVal = 0.6;
                    float variable = p.y;
                    if( variable<minVal ) {
                        ret = minVal;
                    }
                    if( variable>minVal && variable<maxVal ) {
                        ret = variable;
                    }
                    if( variable>maxVal ) {
                        ret = maxVal;
                    }
                } 
                else if(p.x < 0.75) { // Part III
                    float minVal = 0.6;
                    float maxVal = 0.8;
                    float variable = p.y;
                    ret = clamp(variable, minVal, maxVal);
                } 
                else  { // Part IV
                    float y = cos(5.*TWOPI*p.y); // oscillate between +1 and -1
                                                // 5 times, vertically
                    y = (y+1.0)*0.5; // map [-1,1] to [0,1]
                    ret = clamp(y, 0.2, 0.8);
                }
                
                pixel = vec3(ret); // make a color out of return value.
                return vec4(pixel, 1.0);
            }

            vec4 smoothstep1(vec2 fragCoord, vec2 rez){
                vec2 r =  2.0*vec2(fragCoord.xy - 0.5*rez.xy)/rez.y;
                vec2 p = vec2(fragCoord.xy / rez.xy);
                // use [0,1] coordinate system for this example
                
                vec3 bgCol = vec3(0.0); // black
                vec3 col1 = vec3(0.216, 0.471, 0.698); // blue
                vec3 col2 = vec3(1.00, 0.329, 0.298); // red
                vec3 col3 = vec3(0.867, 0.910, 0.247); // yellow

                vec3 pixel = bgCol;
                
                float edge, variable, ret;
                
                // divide the screen into four parts horizontally for different
                // examples
                if(p.x < 1./5.) { // Part I
                    float edge = 0.5;
                    ret = step(edge, p.y); // simple step function
                } 
                else if(p.x < 2./5.) { // Part II
                    // linearstep (not a builtin function)
                    float edge0 = 0.45;
                    float edge1 = 0.55;
                    float t = (p.y - edge0)/(edge1 - edge0);
                    // when p.y == edge0 => t = 0.0
                    // when p.y == edge1 => t = 1.0
                    // RHS is a linear function of y
                    // so, between edge0 and edge1, t has a linear transition
                    // between 0.0 and 1.0
                    float t1 = clamp(t, 0.0, 1.0);
                    // t will have negative values when t<edge0 and
                    // t will have greater than 1.0 values when t>edge1
                    // but we want it be constraint between 0.0 and 1.0
                    // so, clamp it!		
                    ret = t1;
                } 
                else if(p.x < 3./5.) { // Part III
                    // implementation of smoothstep
                    float edge0 = 0.45;
                    float edge1 = 0.55;
                    float t = clamp((p.y - edge0)/(edge1 - edge0), 0.0, 1.0);
                    float t1 = 3.0*t*t - 2.0*t*t*t;
                    // previous interpolation was linear. Visually it does not
                    // give an appealing, smooth transition.
                    // To achieve smoothness, implement a cubic Hermite polynomial
                    // 3*t^2 - 2*t^3
                    ret = t1;
                }
                else if(p.x < 4./5.) { // Part IV
                    ret = smoothstep(0.45, 0.55, p.y);
                }
                else if(p.x < 5./5.) { // Part V
                    // smootherstep, a suggestion by Ken Perlin
                    float edge0 = 0.45;
                    float edge1 = 0.55;
                    float t = clamp((p.y - edge0)/(edge1 - edge0), 0.0, 1.0);		
                    // 6*t^5 - 15*t^4 + 10*t^3
                    float t1 = t*t*t*(t*(t*6. - 15.) + 10.);
                    ret = t1;
                    // faster transition and still smoother
                    // but computationally more involved.
                }	
                    
                pixel = vec3(ret); // make a color out of return value.
                return vec4(pixel, 1.0);
            }

            vec4 mix1(vec2 fragCoord, vec2 rez){
                vec2 p = vec2(fragCoord.xy / rez.xy);
	
                vec3 bgCol = vec3(0.3);
                vec3 col1 = vec3(0.216, 0.471, 0.698); // blue
                vec3 col2 = vec3(1.00, 0.329, 0.298); // red
                vec3 col3 = vec3(0.867, 0.910, 0.247); // yellow 
                
                vec3 ret;
                
                // divide the screen into four parts horizontally for different
                // examples
                if(p.x < 1./5.) { // Part I
                    // implementation of mix
                    float x0 = 0.2; // first item to be mixed
                    float x1 = 0.7;  // second item to be mixed
                    float m = 0.1; // amount of mix (between 0.0 and 1.0)
                    // play with this number
                    // m = 0.0 means the output is fully x0
                    // m = 1.0 means the output is fully x1
                    // 0.0 < m < 1.0 is a linear mixture of x0 and x1
                    float val = x0*(1.0-m) + x1*m;
                    ret = vec3(val);
                } 
                else if(p.x < 2./5.) { // Part II
                    // try all possible mix values 
                    float x0 = 0.2;
                    float x1 = 0.7;
                    float m = p.y; 
                    float val = x0*(1.0-m) + x1*m;
                    ret = vec3(val);		
                } 
                else if(p.x < 3./5.) { // Part III
                    // use the mix function
                    float x0 = 0.2;
                    float x1 = 0.7;
                    float m = p.y; 
                    float val = mix(x0, x1, m);
                    ret = vec3(val);		
                }
                else if(p.x < 4./5.) { // Part IV
                    // mix colors instead of numbers
                    float m = p.y;
                    ret = mix(col1, col2, m);
                }
                else if(p.x < 5./5.) { // Part V
                    // combine smoothstep and mix for color transition
                    float m = smoothstep(0.5, 0.6, p.y);
                    ret = mix(col1, col2, m);
                }
                
                vec3 pixel = ret;
                return vec4(pixel, 1.0);
            }

            void main() {               
                gl_FragColor = mix1(gl_FragCoord.xy, resolution);
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

        let time = 0
        var timeinterval = setInterval(()=>{
            time+=.01;
            shaderMaterial.setFloat("time", time);
        },10);


        
        // shaderMaterial.setVector2("mouse", new BABYLON.Vector2(100, 100));
        shaderMaterial.setVector2("resolution", new BABYLON.Vector2(size.width, size.height));
        // shaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
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