export default class Line {
    constructor(lineLocation, lineType){
        const { line } = lineLocation.start;
        this.lineNum = line;
        this.lineType = lineType;
        this.lineName = '';
        this.lineCondition = '';
        this.lineValue = '';
    }

}