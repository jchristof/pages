import { Ship } from './Ship'

export class GameController{
    constructor(ship:Ship){
 
        this.gamepads = new BABYLON.Gamepads((gamePad)=>{     
            const xgamePad = gamePad as BABYLON.Xbox360Pad;
            xgamePad.onleftstickchanged((values:BABYLON.StickValues)=>{
                if(values.x<-.3){
                    ship.moveLeft = true;
                    ship.moveRight = false;
                    return;
                }
                else if(values.x>.3){
                    ship.moveLeft = false;
                    ship.moveRight = true;
                    return;
                }
                if(values.y > 0)
                    ship.position.z + .5;
                ship.moveLeft = false;
                ship.moveRight = false;
            });
            xgamePad.onbuttondown((buttonPressed:BABYLON.Xbox360Button)=>{
                switch(buttonPressed){
                    case BABYLON.Xbox360Button.A:
                        ship.fireShot();
                        break;
                }
            })
        });
        (this.gamepads as any)._startMonitoringGamepads();
    }

    dispose(){
        this.gamepads.dispose();
    }

    private gamepads:BABYLON.Gamepads;
}