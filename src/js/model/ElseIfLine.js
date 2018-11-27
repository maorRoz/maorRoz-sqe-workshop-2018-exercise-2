import IfLine from './IfLine';

const type = 'else if statement';

export default class ElseIfLine extends IfLine{
    constructor(statement){
        super(statement);
        this.lineType = type;
    }
}