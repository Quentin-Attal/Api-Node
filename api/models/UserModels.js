// init bcrypt
const bcrypt = require('bcrypt');

class User {
    constructor(db) {
        this.db = db;
    }

    async login(email, password) {
        // get user with email 
        const query = `SELECT * FROM users WHERE email = $1 limit 1`;
        const values = [email];
        try {
            const { rows } = await this.db.query(query, values);
            if (rows.length === 0) {
                return { success: false };
            }
            const storedHash = rows[0].password;

            // compare password store hash with password send
            const correctPassword = await bcrypt.compare(password, storedHash);
            if (correctPassword) {
                // generation du token et renvoie
                const Auth = require('../models/AuthModels');
                const auth = new Auth();
                const token = auth.generateToken(rows[0])

                // Return success and user token
                return { success: true, token: token };
            } else {

                // the password is incorrect
                return { success: false };
            }
        } catch (err) {
            // Query failed
            throw new Error(`Erreur lors de la récupération des informations de l'utilisateur : ${err.message}`);
        }
    }

    async register(email, password, username) {

        // check if email is already exist
        const query = `SELECT * FROM users WHERE email = $1`;
        const values = [email];
        try {
            const { rows } = await this.db.query(query, values);
            if (rows.length === 0) {
                const saltRounds = 10;
                // generate password hash
                const passwordHash = await bcrypt.hash(password, saltRounds);
                const query = 'INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING id, username, email';
                const values = [email, passwordHash, username];
                const { rows } = await this.db.query(query, values);

                // generation du token et renvoie
                const Auth = require('../models/AuthModels');
                const auth = new Auth();
                const token = auth.generateToken(rows[0])

                // Return success and user id
                return { success: true, token: token };
            } else {
                // email already used
                return { success: false }
            }
        } catch (err) {
            // Query failed
            throw new Error(`Erreur lors de la récupération des informations de l'utilisateur : ${err.message}`);
        }

    }

}

module.exports = User;  