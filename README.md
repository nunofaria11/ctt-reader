# CTT Reader
Conversor de ficheiros de códigos postais (fornecidos pelos CTT) para JSON.

## Funções
```
/**
 * Reads and parses a file to JSON format (splits it by ';').
 * @param {String} rowFormat An array of strings corresponding to the properties to read from each row (order matters).
 * @param {String} filepath The path to the data source file.
 */
parseToJson(rowFormat, filePath);

// ex.
parseToJson(['DD', 'DESIG'], './data/concelhos.txt');
```

## Linha de comandos
```
$ node ctt-reader -d data/distritos.txt
$ node ctt-reader --distritos data/distritos.txt

$ node ctt-reader -c data/concelhos.txt
$ node ctt-reader --concelhos data/concelhos.txt

$ node ctt-reader -t data/todos_cp.txt
$ node ctt-reader --todoscp data/todos_cp.txt
```

## Ficheiros suportados:
- concelhos.txt
- distritos.txt
- todos_cp.txt

## Versões futuras
- Adicionar framework de testes