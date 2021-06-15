
import Field from "./Logic/field";
import DrawField from "./UI/drawField";

class Game
{
    score : number;
    speed : number;
    field : Field;
    drawer:DrawField;
    constructor() {
        this.score=0;
        this.speed=1;
        this.field=new Field();
        this.drawer=new DrawField(this.field.getRepresentative());
        this.game();
    }

     async game(){while(true) {
         await this.delay(1000 * this.speed);
         this.field.gonext();
         this.drawer.update(this.field.gonext());
     }
     }

     delay(delay: number) {
    return new Promise(r => {
        setTimeout(r, delay);
    })
}
}

new Game();



