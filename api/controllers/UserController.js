class UserModel {
    constructor(db) {
        this.db = db;
    }

    async login(email, password) {
        // init bcrypt
        const bcrypt = require('bcrypt');

        // get user with email 
        const query = `SELECT * FROM users WHERE email = $1`;
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
                // Return success and user id
                return { success: true, id: rows[0].id };
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
        // init bcrypt
        const bcrypt = require('bcrypt');

        // check if email is already exist
        const query = `SELECT * FROM users WHERE email = $1`;
        const values = [email];
        try {
            const { rows } = await this.db.query(query, values);
            if (rows.length === 0) {
                const saltRounds = 10;
                // generate password hash
                const passwordHash = await bcrypt.hash(password, saltRounds);
                const query = 'INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING id';
                const values = [email, passwordHash, username];
                const { rows } = await this.db.query(query, values);
                const id = rows[0].id;

                // Return success and user id
                return { success: true, id: id };
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