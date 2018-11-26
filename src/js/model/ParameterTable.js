export default class ParametersTable{
    constructor(){
        this.parameters = [];
    }
    
    addRow(parameter){
        this.parameters.push(parameter);
    }
}