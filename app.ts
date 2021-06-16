
import Field from "./Logic/field";
import DrawField from "./UI/drawField";

class Game
{
    score : number;
    speed : number;
    field : Field;
    drawer:DrawField;
    playerPos:number;
    constructor() {
        this.score=0;
        this.speed=1000;
        this.playerPos=1;
        this.field=new Field(this.playerPos);
        this.drawer=new DrawField(this.field.getRepresentative(this.playerPos));
        this.game();
        document.addEventListener('keydown', (event) => {
            if(event.key=="ArrowLeft"||event.key=="a"||event.key=="A")this.playerPos=0;
            else if(event.key=="ArrowRight"||event.key=="d"||event.key=="D")this.playerPos=1;
        });
    }

     async game(){
        let crash=false;
        while(!crash) {
         await this.delay(1000 / (this.speed/1000));
         this.speed+=23;
         let res=this.field.gonext(this.playerPos)
         crash=res[1];
         this.score++;
         await this.drawer.update(res[0],this.score);
     }
     alert("GAME OVER");
     }

     delay(delay: number) {
    return new Promise(r => {
        setTimeout(r, delay);
    })
}
}



new Game();



