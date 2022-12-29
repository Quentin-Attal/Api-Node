const User = require('../models/UserModels');

class UserController {
    constructor(db) {
        this.user = new User(db);
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            // récupère l'utilisateur avec le modèle d'utilisateur
            const result = await this.user.login(email, password);
            if (result.success) {
                // le login a réussi, on envoie un code de succès et l'utilisateur
                res.status(200).json(result.user);
            } else {
                // le login a échoué, on envoie un code d'erreur
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } catch (err) {
            // une erreur s'est produite, on envoie un code d'erreur
            res.status(500).send({ error: err.message });
        }
    }

    async register(req, res) {
        const { email, password, username } = req.body;
        try {
            // enregistre l'utilisateur avec le modèle d'utilisateur
            const result = await this.user.register(email, password, username);
            if (result.success) {
                // l'enregistrement a réussi, on envoie un code de succès et l'ID de l'utilisateur
                res.status(200).json(result.id);
            } else {
                // l'enregistrement a échoué, on envoie un code d'erreur
                res.status(400).json({ error: 'Email already in use' });
            }
        } catch (err) {
            // une erreur s'est produite, on envoie un code d'erreur
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = UserController;