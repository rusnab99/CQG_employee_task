
import {Car} from "../UI/car";


export default class Field{
    private field : Array<Array<boolean>>;//массив предстовляеющий игровое поле не включающее игрока.
    road : boolean[];//паттерн края дороги
    car : boolean[][];//паттерн машины "едущей" на игрока
    lastcarY:number;//левый верхний угол машины сгенерированной в предыдущий раз
    lastcarX:number;//ряд предыдущей машины
    nextCarY:number;
    nextCarX:number;
    step:number;//ряд предыдущей машины
    constructor() {
        //казалось бы идущий далее код максимально неправильный и тяжело читаемый, его можно легко обернуть в цикл и все будет красиво.
        //Тем не менее такой подход позволяет сэкономить ресурсы конечного пользователя за счет того что суммарно мы исключили порядка 144 проверок условия цикла
        // и 192 операций инкрементации при создании поля
        this.car=Car.getPattern(true);
        this.field=new Array(24);
        this.road=new Array(true,true,true,false);
        this.lastcarX=this.rand(1,0);
        this.nextCarX=this.rand(1,0);
        this.lastcarY=0;
        this.nextCarY=this.rand((this.nextCarX==this.lastcarX?8:12),(this.nextCarX==this.lastcarX?5:8));
    for (let y=0;y<4;y++) {
        this.generateRoad(y);
        this.setcar(y);
    }
        for (let y=4;y<24;y++){
           this.emptyRoad(y);
        }
        this.step = 1;
    }

    rand(max,min):number{
        return Math.floor(Math.random() * (max-min+1)+min);
    }

    getRepresentative():boolean[][]{
       return this.field.slice(4);
    }

    setcar(y){
        if (this.lastcarX === 0) {
            this.field[y][2] = this.car[y % 4][0];
            this.field[y][3] = this.car[y % 4][1];
            this.field[y][4] = this.car[y % 4][2];
            this.field[y][5] = false;
            this.field[y][6] = false;
            this.field[y][7] = false;
        } else {

            this.field[y][2] = false;
            this.field[y][3] = false;
            this.field[y][4] = false;
            this.field[y][5] = this.car[y % 4][0];
            this.field[y][6] = this.car[y % 4][1];
            this.field[y][7] = this.car[y % 4][2];
        }

}

generateRoad(y){
    this.field[y] = new Array<boolean>(10);
    this.field[y][0] = this.road[y % 4];
    this.field[y][1] = false;
    this.field[y][8] = false;
    this.field[y][9] = this.road[y % 4];
}
emptyRoad(y){
    this.field[y] = new Array<boolean>(10);
    this.field[y][0]=this.road[y % 4];
    this.field[y][1]=false;
    this.field[y][2]=false;
    this.field[y][3]=false;
    this.field[y][4]=false;
    this.field[y][5]=false;
    this.field[y][6]=false;
    this.field[y][7]=false;
    this.field[y][8]=false;
    this.field[y][9]=this.road[y % 4];
}

    gonext():boolean[][]
    {
        this.moveroad();
        this.field[0] = new Array<boolean>(10);
        this.field[0][0]=this.road[this.step % 4];
        this.field[0][1]=false;
        this.field[0][2]=false;
        this.field[0][3]=false;
        this.field[0][4]=false;
        this.field[0][5]=false;
        this.field[0][6]=false;
        this.field[0][7]=false;
        this.field[0][8]=false;
        this.field[0][9]=this.road[this.step % 4];
        if(this.lastcarY>=(this.nextCarY))
        {
            this.lastcarX=this.nextCarX;
            this.lastcarY=0;
            this.nextCarX=this.rand(1,0);
            this.nextCarY=this.rand((this.nextCarX==this.lastcarX?8:12),(this.nextCarX==this.lastcarX?5:8));
            for (let y=0;y<4;y++) {this.setcar(y);}
        }
        //if(this.step==0){
           // if(this.lastcarY>=8){
           //     this.lastcarX=this.rand(1,0);
          //      for (let y=0;y<4;y++) {this.generateRoad(y);this.setcar(y);}
           //     this.lastcarY=0;
           // }
           // else
              //  for (let y=0;y<4;y++) this.emptyRoad(y);
       // }
        this.step++;
        this.step%=4;
        this.lastcarY++;
        return this.getRepresentative();
    }

    moveroad(){
        for(let i=23;i>0;i--)
        {
            this.field[i]=this.field[i-1];
        }
    }
}