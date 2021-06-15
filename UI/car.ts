export  class Car{
    static getPattern(_isFlipped:boolean):boolean[][]{
        let pattern:boolean[][];
        if(_isFlipped)
             pattern=[[true,false,true],
                [false,true,false],
                [true,true,true],
                [false,true,false]];
        else
             pattern=[[false,true,false],
                [true,true,true],
                [false,true,false],
                [true,true,true]];
        return pattern;
     }
}