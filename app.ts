
import Field from "./Logic/field";
import DrawField from "./UI/drawField";

class Game
{
    score : number;
    speed : number;
    field : Field;
    drawer:DrawField;
    playerPos:number;
    crash=false;
    constructor() {
        this.score=0;
        this.playerPos=1;
        this.field=new Field(this.playerPos);
        this.drawer=new DrawField(this.field.getRepresentative(this.playerPos));
        this.speed=1000;
        document.addEventListener('keydown', (event) => {
            if(event.key=="ArrowLeft"||event.key=="a"||event.key=="A")this.playerPos=0;
            else if(event.key=="ArrowRight"||event.key=="d"||event.key=="D")this.playerPos=1;
            else if(event.key==" "){this.field=new Field(this.playerPos);
            this.crash=true;
            this.speed=1000;
                this.score=0;
                this.playerPos=1;
                this.drawer.update(this.field.getRepresentative(this.playerPos),this.score,Math.floor(this.speed/1000));
                 this.game();
            }
        });
    }

     async game(){

        let crash=false;
        let field=this.field;
         await this.delay( 500);
        while((!crash)&&(field==this.field)) {

         await this.delay(1000 / (this.speed/1000));
         this.speed+=23;
         let res=field.gonext(this.playerPos)
            crash=res[1];
         this.score++;
         await this.drawer.update(res[0],this.score,Math.floor(this.speed/1000));
     }
     if(crash)
     for(let i=0;i<4;i++){
         await this.delay(1000 / (this.speed/1000));
         await this.drawer.update(field.goCrash(i),this.score,Math.floor(this.speed/1000));
     }
     }

     delay(delay: number) {
    return new Promise(r => {
        setTimeout(r, delay);
    })
}
}



new Game();



