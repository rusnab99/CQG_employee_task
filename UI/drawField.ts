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
                html+=('<td class="pixel '+(this.field[y][x]?"active":"")+'" id="r'+y+'c'+x+'"></td>');
            html+=("</tr>");
        }
        html+=("</table><div class='data'><p>Score</p><p class='add' id='score'>0</p><p>Speed</p><p class='add' id='speed'>1</p>" +
            "<p id='faq'>Press spacebar to start.</p></div>");
        this.gameField.innerHTML=html;
    }
    difference: Array<[number,number]>|undefined;
    update(_field:boolean[][],score,speed) {
        // @ts-ignore
        document.getElementById('score').innerText=score;
        // @ts-ignore
        document.getElementById('faq').innerText="Press spacebar to restart.";
        // @ts-ignore
        document.getElementById('speed').innerText=speed;
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
