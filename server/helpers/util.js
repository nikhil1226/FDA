import _pick from 'lodash/pick'
import _keys from 'lodash/keys'
import _omit from 'lodash/omit'

export function toCamelCase(str) {
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    })
}

export function tediousResultToJSON(rows){
    let dataList = [];
    rows.forEach((columns)=> {
        let rowObject = {};
        columns.forEach((column)=> {
            rowObject[toCamelCase(column.metadata.colName)] = column.value;
        });
        // console.log('\x1b[32m%s\x1b[0m : ','row', rowObject);
        dataList.push(rowObject);
    })

    return dataList;
}

export function tediousGroupResultToJSON(rows, groupByColumn, groupColumn, contentColumns){
    let dataList = [];
    rows.forEach((columns)=> {
        let rowObject = {};
        columns.forEach((column)=> {
            rowObject[toCamelCase(column.metadata.colName)] = column.value;
        });
        // console.log('\x1b[32m%s\x1b[0m : ','row', rowObject);
        dataList.push(rowObject);
    })

// Will use lodash later
let oldVal = '';
let groupResult = [];
dataList.forEach(function(row) {

  if (row[groupByColumn] != oldVal){
    let rowData = _omit(row,groupColumn,contentColumns);
    rowData[toCamelCase(row[groupColumn])] = [];
    groupResult.push(rowData);
  } else {

  }

  oldVal = row[groupByColumn];
});

console.log(groupResult);
    return dataList;
}
