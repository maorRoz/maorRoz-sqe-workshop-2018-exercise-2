import Line from './Line';

const type = 'else statement';

export default class ElseLine extends Line{
    constructor(object){
        super(object.loc, type);
    }
}