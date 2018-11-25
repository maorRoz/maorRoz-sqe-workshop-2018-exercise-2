import Line from './Line';
import { extractValue } from '../valueExtractor';

const type = 'while statement';

export default class WhileLine extends Line{
    constructor(statement){
        const { test } = statement;
        super(test.loc, type);
        this.lineCondition = extractValue(test);
        
    }
}