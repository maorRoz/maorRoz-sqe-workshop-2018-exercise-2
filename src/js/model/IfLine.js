import Line from './Line';
import { extractValue } from '../valueExtractor';

const type = 'if statement';

export default class IfLine extends Line{
    constructor(statement){
        const { test } = statement;
        super(type);
        this.lineCondition = extractValue(test);
    }
}