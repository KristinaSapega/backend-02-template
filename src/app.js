const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');


dotenv.config();

const { 
    PORT = 3005, 
    API_URL = "http://127.0.0.1",
    MONGO_URL = "mongodb://localhost:27017/mydb"
 } = process.env;

mongoose.connect(MONGO_URL, error => {
    if (error) throw error;
    console.log('Connected to MongoDb');
})


const app = express();

app.use(bodyParser.json()); // Обработка данных, которые приходят в теле запроса в формате JSON
app.use(cors());

// Чтобы использовать роуты
app.use('/users', userRouter); // Все роуты пользователей начинаются с /users
app.use('/books', bookRouter); // Все роуты книг начинаются с /books

// Обработка корневого маршрута
app.get('/', (request, response) => {
    response.status(200);
    response.send("Hello, World!");
});

// Обработка ошибок 404
app.use((request, response, next) => {
    response.status(404).send({ error: "Not found" });
});

// Обработка ошибок 500
app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send({ error: "Something went wrong!" });
});


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Ссылка на сервер: ${API_URL}:${PORT}`);
});
