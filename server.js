const fastify = require('fastify')({ logger: true });
const { Client } = require('pg');


// phppgadmin, запущенный в WSL2, открывается в браузере Windows по адресу http://localhost/phppgadmin

// Настройки подключения к базе данных
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'first_db',
    password: '1234',
    port: 5432,
});

client.connect();

// Регистрация пользователя
fastify.post('/register', async (request, reply) => {
    const { email } = request.body;

    try {
        await client.query('INSERT INTO users (email) VALUES ($1)', [email]);
        reply.send({ success: true });
    } catch (error) {
        reply.status(400).send({ error: 'Ошибка регистрации' });
    }
});

// Вычисление суммы
fastify.post('/calculate', async (request, reply) => {
    const { number1, number2 } = request.body;
    const sum = number1 + number2;
    reply.send({ sum });
});

// Запуск сервера
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Сервер запущен на http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
