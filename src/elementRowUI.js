const toHtmlLineAttribute = (attribute) => {
    const htmlLineAttribute = document.createElement('td');
    htmlLineAttribute.setAttribute('align', 'center');
    htmlLineAttribute.textContent = attribute;
    return htmlLineAttribute;
};

const rowToHtml = (row) => {
    const htmlLineNum = toHtmlLineAttribute(row.lineNum);
    const htmlLineType = toHtmlLineAttribute(row.lineType);
    const htmlLineName = toHtmlLineAttribute(row.lineName);
    const htmlLineCondition = toHtmlLineAttribute(row.lineCondition);
    const htmlLineValue = toHtmlLineAttribute(row.lineValue);
    return ({ htmlLineNum,htmlLineType,htmlLineName,htmlLineCondition, htmlLineValue });
};

export const createHtmlElementRow = (row) => {
    const htmlRow = document.createElement('tr');
    const { htmlLineNum,htmlLineType,htmlLineName,htmlLineCondition, htmlLineValue } = rowToHtml(row);
    htmlRow.append(htmlLineNum,htmlLineType,htmlLineName, htmlLineCondition, htmlLineValue);
    return htmlRow;
};