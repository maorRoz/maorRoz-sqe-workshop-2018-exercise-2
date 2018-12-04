import Line from './Line';
import { extractValue } from '../valueExtractor';

const type = 'assignmentExpression';

export default class AssignmentLine extends Line {
    constructor(expression){
        const { left , right} = expression;
        super(type);
        const { name } = left;
        this.lineName = name;
        this.lineValue = extractValue(right);
        
    }
}