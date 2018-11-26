import $ from 'jquery';
import {parseCode} from './code-analyzer';
import { createMethodAndArguments } from './controller/elementsTableController'; 
//import { colorMethod } from '../view';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        const codeToParse = $('#codePlaceholder').val();
        const parsedCode = parseCode(codeToParse);
        const { method, arguments } = createMethodAndArguments(parsedCode);
     //   const parsedMethod = symbolicSubstitution(method);
     //   const evalParsedMethod = toEvalParsedMethod(parsedMethod, arguments);
     //   colorMethod(evalParsedMethod);
    });
});