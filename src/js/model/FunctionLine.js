import Line from './Line';

const type = 'function declaration';

export default class FunctionLine extends Line{
    constructor(object){
        const { name, loc } = object.id;
        super(loc, type);
        this.lineName = name;
    }
}