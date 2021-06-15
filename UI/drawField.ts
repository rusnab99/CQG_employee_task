export default class DrawField{
    field: boolean[][];
    gameField: any;
    constructor(_field) {
        this.field=_field;
        this.gameField=document.getElementById("gameField");
        this.draw();
    }

    draw(){
        let html='<table>';
        for(let y=0;y<20;y++){
            html+="<tr>";
            for(let x=0;x<10;x++)
                html+=('<td class="pixel '+(this.field[y][x]?"active":"")+'" id="r'+y+'c'+x+'">*</td>');
            html+=("</tr>");
        }
        html.concat("</table>");
        this.gameField.innerHTML=html;
    }
    difference: Array<[number,number]>|undefined;
    update(_field:boolean[][]) {
        console.log("tyutyi");
        this.difference = new Array<[number, number]>();
        for (let y = 0; y < 20; y++)
            for (let x = 0; x < 10; x++)
                if (this.field[y][x] != _field[y][x]) this.difference.push([y, x]);

        this.field=_field;
        for(let i=0;i<this.difference.length;i++){
            if(_field[this.difference[i][0]][this.difference[i][1]])
                { // @ts-ignore
                    document.getElementById('r'+this.difference[i][0]+'c'+this.difference[i][1]+'').classList.add("active");
                }
            else
               { // @ts-ignore
                   document.getElementById('r'+this.difference[i][0]+'c'+this.difference[i][1]+'').classList.remove("active");
               }
        }
    }
}
