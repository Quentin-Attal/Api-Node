const { Client } = require('pg');
const jwt = require('jsonwebtoken');

class Auth {
    constructor(db) {
        this.db = db;
    }

}