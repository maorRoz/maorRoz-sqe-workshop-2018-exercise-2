import Line from './Line';

const type = 'function declaration';

export default class FunctionLine extends Line{
    constructor(object, body){
        const { name} = object.id;
        super(type);
        this.lineName = name;
        this.lineBody = body;
    }
}