import $ from 'jquery';
import {parseCode} from './code-analyzer';
import { createMethodAndArguments } from './controller/elementsTableController'; 
import { symbolicSubstitution } from './controller/symbolicSubstituter';
import toEvalParsedMethod from './controller/evaluator';
import  createOutputFunction from './view/view';

const argumentsTextIntoValues = () => {
    const argumentsText = $('#argumentsLine').val().split(/(?![^)(]*\([^)(]*?\)\)),(?![^[]*\])/);
    return argumentsText.map(argument => {
        if(argument.length > 0){
            switch(argument[0]){
            case '"':
            case '\'': return argument;
            default: return JSON.parse(argument);
            }
        }
        return '';
    });
};

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        const codeToParse = $('#codePlaceholder').val();
        const parsedCode = parseCode(codeToParse);
        const method = createMethodAndArguments(parsedCode);
        global.subtitutedMethod = symbolicSubstitution(method);
        const argumentsValues = argumentsTextIntoValues();
        toEvalParsedMethod(global.subtitutedMethod, argumentsValues);
        $('#parsedCode #codeLine' ).remove();
        createOutputFunction($('#parsedCode'));
    });
});