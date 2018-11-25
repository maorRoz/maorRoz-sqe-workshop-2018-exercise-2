import Line from './Line';
import { extractValue } from '../valueExtractor';

const type = 'variable declaration';
export default class VariableLine extends Line{
    constructor(object, value){
        super(object.loc, type);
        this.lineName = object.name;
        this.lineValue = extractValue(value);
    }
}