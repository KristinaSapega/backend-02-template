const http = require('http');
const fs = require('fs');
const path = require('path');
const { getUsers } = require('./modules/users');

const PORT = process.env.PORT || 3003

const server = http.createServer((request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const queryParams = url.searchParams;

    response.setHeader('Content-Type', 'text/plain');

    if (queryParams.has('hello')) {
        const name = queryParams.get('hello');

        if(name) {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end(`Hello, ${name}.`);
        } else {
            response.writeHead(400, {'Content-Type': 'text/plain'});
            response.end('Enter a name');
        }
    } else if (queryParams.has('users')) {
        getUsers()
        .then((users) => {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(users));
        })
        .catch((error) =>{
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Internal Server Error');
        }) 
    } else if (queryParams.toString() === '') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Hello, World!');
    } else {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end();
    }


    // Написать обработчик запроса:
    // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
    // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
    // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
    // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
    // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500

});

server.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
    console.log(`Сервер запущен по адресу http://127.0.0.1:${PORT}`);
});


