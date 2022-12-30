const jwt = require('jsonwebtoken');

class Auth {

    // Fonction de génération de token
    generateToken(user) {
        // Définition des données à inclure dans le token
        const payload = {
            userId: user._id,
            name: user.username,
            email: user.email
        };

        // Génération du token avec les données et une durée de validité de 7 jours
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        return token;
    }

    // Function qui va check le token
    checkToken(token) {

        // On récupère les donnée stocké dans le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return decoded
    }

}

module.exports = Auth