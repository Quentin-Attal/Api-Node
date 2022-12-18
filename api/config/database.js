const { Client } = require('pg');

const host = process.env.DB_HOST;
const port = process.env.DB_POST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

const client = new Client({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database
});