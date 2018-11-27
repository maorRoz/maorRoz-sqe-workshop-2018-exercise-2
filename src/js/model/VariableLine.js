import Line from './Line';
import { extractValue } from '../valueExtractor';

const type = 'variable declaration';
export default class VariableLine extends Line{
    constructor(object, value){
        super(type);
        this.lineName = object.name;
        this.lineValue = extractValue(value);
    }
}