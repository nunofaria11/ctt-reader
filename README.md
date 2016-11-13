# CTT Reader
Conversor de ficheiros de códigos postais (fornecidos pelos CTT) para JSON.

## Funções
Exemplo de utilização como módulo:
```
const CttReader = require('ctt-reader');

CttReader.parseToJson(['DD', 'DESIG'], './data/distritos.txt').then(
    function (distritos) {...},
    function (err) {...},
);
```

Funções específicas:
- `parseDistritos('./data/distritos.txt')`
- `parseConcelhos('./data/concelhos.txt')`
- `parseTodosCp('./data/todos_cp.txt')`

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