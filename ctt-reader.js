
'use strict';
const fs = require('fs');
const Q = require('q');

function parseRowToJson(row, separator, properties) {
    let words, result, i;
    words = row.split(separator);
    if (words.length !== properties.length) {
        throw new Error('Illegal format: properties length does not match word split (' + words.length + ' !== ' + properties.length + ')');
    }
    result = {};
    for (i = 0; i < words.length; i++) {
        result[properties[i]] = words[i];
    }
    return result;
}

function parseDataToJson(data, rowFormat) {
    let i, rows, row, result;
    rows = data.split('\r\n');
    result = [];
    for (i = 0; i < rows.length; i++) {
        row = rows[i];
        if (row) {
            result.push(parseRowToJson(row, ';', rowFormat));
        }
    }
    return result;
}

/**
 * Reads and parses a file to JSON format (splits it by ';').
 * @param {String} rowFormat An array of strings corresponding to the properties to read from each row (order matters).
 * @param {String} filepath The path to the data source file.
 * @returns {Promise} A promise is resolved with the JSON object; rejected if an error occurred.
 */
function parseFileToJson(rowFormat, filepath) {
    const defer = Q.defer();
    const options = {
        encoding: 'binary'
    };
    fs.readFile(filepath, options, function (err, data) {
        let result, converted, buffer;
        if (err) {
            defer.reject(err);
        }
        result = parseDataToJson(data, rowFormat);
        if (!result) {
            defer.reject({
                error: 'No data!'
            });
        }
        defer.resolve(result);
    });
    return defer.promise;
}

const parseDistritos = parseFileToJson.bind(this, ['DD', 'DESIG']);
const parseConcelhos = parseFileToJson.bind(this, ['DD', 'CC', 'DESIG']);
const parseTodosCp = parseFileToJson.bind(this, ['DD', 'CC', 'LLLL', 'LOCALIDADE', 'ART_COD', 'ART_TIPO', 'PRI_PREP', 'ART_TITULO', 'SEG_PREP', 'ART_DESIG', 'ART_LOCAL', 'TROCO', 'PORTA', 'CLIENTE', 'CP4', 'CP3', 'CPALF']);

// Export functions
module.exports = {
    parseToJson: parseFileToJson,
    parseDistritos: parseDistritos,
    parseConcelhos: parseConcelhos,
    parseTodosCp: parseTodosCp
};

function printUsage(message) {
    if (message) {
        console.log(message);
    }
    console.log(
        'Usage: node ctt-reader.js <OPTION> <FILEPATH>\n' +
        ' OPTION:\n' +
        '  -d --distritos\n' +
        '  -c --concelhos\n' +
        '  -t --todoscp'
    );
}

if (process.argv.length > 2) {

    if (process.argv.length !== 4) {
        printUsage();
        return;
    }
    const cmdOption = process.argv[2];
    const cmdFilePath = process.argv[3];
    let promise;

    switch (cmdOption) {
        case '--distritos':
        case '-d':
            promise = parseDistritos(cmdFilePath);
            break;
        case '--concelhos':
        case '-c':
            promise = parseConcelhos(cmdFilePath);
            break;
        case '--todoscp':
        case '-t':
            promise = parseTodosCp(cmdFilePath);
            break;
        default:
            printUsage('Unknown option: "' + cmdOption + '"\n');
            return;
    }

    promise.then(
        function (data) {
            console.log(JSON.stringify(data));
        },
        function (err) {
            console.error('An error occurred:', err);
        }
    );

}