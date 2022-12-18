const jwt = require('jsonwebtoken');

class UserModel {
    constructor() {
    }

    async login(email, password) {
        try {
            await this.client.connect()
        } catch (e) {
            console.log(e)
        }
        const query = `SELECT * FROM users WHERE email = $1`;
    }

}