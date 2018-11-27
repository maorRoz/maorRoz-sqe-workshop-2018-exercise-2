import Line from './Line';
import { extractValue } from '../valueExtractor';

const type = 'while statement';

export default class WhileLine extends Line{
    constructor(statement, body){
        const { test } = statement;
        super(type);
        this.lineCondition = extractValue(test);
        this.lineBody = body;
        
    }
}