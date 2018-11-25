import Line from './Line';
import { extractValue } from '../valueExtractor';

const type = 'for statement';

export default class ForLine extends Line{
    constructor(statement){
        const { init,test,update } = statement;
        super(test.loc, type);
        this.lineCondition = `${extractValue(init)};${extractValue(test)};${extractValue(update)}`;
    }
}