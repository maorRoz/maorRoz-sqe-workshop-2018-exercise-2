import $ from 'jquery';
import {parseCode} from './code-analyzer';
import { createMethodAndArguments } from './controller/elementsTableController'; 
import { symbolicSubstitution } from './controller/symbolicSubstituter';
import toEvalParsedMethod from './controller/evaluator';
import  createOutputFunction from './view/view';

const argumentsTextIntoValues = () => {
    const argumentsText = $('#argumentsLine').val().split(/(?![^)(]*\([^)(]*?\)\)),(?![^[]*\])/);
    return argumentsText.map(argument => argument.length > 0 ?  JSON.parse(`"${argument}"`) : '');
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