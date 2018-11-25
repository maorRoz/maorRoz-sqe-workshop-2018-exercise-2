import Line from './Line';
import { extractValue } from '../valueExtractor';

const type = 'return statement';

export default class ReturnLine extends Line{
    constructor(statement){
        const { argument } = statement;
        super(argument.loc, type);
        this.lineValue = extractValue(argument);
    }
}