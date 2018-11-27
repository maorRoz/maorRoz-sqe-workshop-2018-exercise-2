export default class LocalTable{
    constructor(){
        this.variables = [];
        this.assignments = [];
    }
    
    addVariable(variable){
        this.variables.push(variable);
    }

    addAssignment(assignment){
        this.assignments.push(assignment);
    }
}