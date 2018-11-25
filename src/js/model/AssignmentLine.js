import Line from './Line';
import { extractValue } from '../valueExtractor';

const type = 'assignment expression';

export default class AssignmentLine extends Line{
    constructor(expression){
        const { left , right, loc } = expression;
        super(loc, type);
        const { name } = left;
        this.lineName = name;
        this.lineValue = extractValue(right);
        
    }
}