import $ from 'jquery';
import {parseCode} from './code-analyzer';
import { createMethodAndArguments } from './controller/elementsTableController'; 
import { symbolicSubstitution } from './controller/symbolicSubstituter';
import toEvalParsedMethod from './controller/evaluator';
import  createOutputFunction from '../view';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        const codeToParse = $('#codePlaceholder').val();
        const parsedCode = parseCode(codeToParse);
        const tables = createMethodAndArguments(parsedCode);
        global.subtitutedMethod = symbolicSubstitution(tables);
        const argumentsValues = $('#argumentsLine').val().split(',')
        toEvalParsedMethod(argumentsValues);
       $('#parsedCode #codeLine' ).remove();
        createOutputFunction(global.subtitutedMethod, $('#parsedCode'));
    });
});