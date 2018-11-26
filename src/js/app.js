import $ from 'jquery';
import {parseCode} from './code-analyzer';
import { createElementTable, implementElementTableUI } from './controller/elementsTableController'; 
import { colorMethod } from '../view';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        const codeToParse = $('#codePlaceholder').val();
        const parsedCode = parseCode(codeToParse);
        //$('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        const { method, arguments } = createMethodAndArguments(parseCode);
        const parsedMethod = symbolicSubstitution(method);
        const evalParsedMethod = toEvalParsedMethod(parsedMethod, arguments);
        colorMethod(evalParsedMethod);
    });
});