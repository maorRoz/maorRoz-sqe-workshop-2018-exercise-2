export default class ElementsTable{
    constructor(){
        this.elementRows = [];
    }
    
    addRow(element){
        this.elementRows.push(element);
        this.currentLineNum = element.lineNum;
        return this.currentLineNum;
    }
}