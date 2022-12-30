const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors())

const db = require('./config/database');
db.connect((err) => {
    if (err) {
        console.error('Failed to connext to the database:', err.stack);
        process.exit(1);
    }
    console.log('Successfully connected to the database.')
});

app.get("/", (req, res) => {
    res.send("<h1>Welcome to EJSs world!</h1>");
});

app.get("/pokemons", async (req, res) => {
    let offset = req.query.offset ?? 0;
    const { rows } = await db.query('SELECT * FROM pokemons limit 20 OFFSET $1', [offset]);
    res.status(200).json(rows)
});

app.get('/pokemon/init', async (req, res) => {
    const fs = require('fs');
    await db.query(`DROP TABLE IF EXISTS pokemons;`);
    await db.query(`CREATE TABLE IF NOT EXISTS "pokemons" (
        "id" VARCHAR(6) PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "type_1" VARCHAR(255) NOT NULL,
        "type_2" VARCHAR(255),
        "total" INT NOT NULL,
        "hp" INT NOT NULL,
        "attack" INT NOT NULL,
        "defense" INT NOT NULL,
        "spatk" INT NOT NULL,
        "spdef" INT NOT NULL,
        "speed" INT NOT NULL,
        "generation" INT NOT NULL,
        "legendary" BOOLEAN NOT NULL
    );`);
    const string = fs.readFileSync("pokemon.txt", 'utf8')
    await db.query(string);
    const { rows } = await db.query('SELECT * FROM pokemons limit 1');
    res.status(200).json(rows);
});

app.get('/pokemon/:id', async (req, res) => {
    const id = req.params.id
    const { rows } = await db.query('SELECT * FROM pokemons where id = $1 limit 1', [id]);
    res.status(200).json(rows)
});

app.post('/pokemon', async (req, res) => {
    let check = true;
    const need = ["id", "name", "type_1", "type_2", "total", "hp", "attack", "defense", "spatk", "spdef", "speed", "generation", "legendary"];
    if (Object.keys(req.body).length !== need.length) {
        check = false;
    } else {
        for (const property in req.body) {
            if (!need.includes(property)) {
                console.log(property)
                check = false;
                break;
            }
        }
    }
    if (check) {
        const { id, name, type_1, type_2, total, hp, attack, defense, spatk, spdef, speed, generation, legendary } = req.body
        db.query('INSERT INTO pokemons VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) ON CONFLICT DO NOTHING RETURNING *',
            [id, name, type_1, type_2, total, hp, attack, defense, spatk, spdef, speed, generation, legendary])
            .then(result => {
                if (result.rows.length === 0) {
                    res.status(400).json({ result: "error", error: "id already exist" })
                } else {
                    res.status(201).json({ result: "success", insert: result.rows })
                }
            })
            .catch(result => {
                res.status(400).json({ result: "error" })
            })
    } else {
        res.status(400).json({ error: "not valid object send" })
    }
});

app.put('/pokemon', (req, res) => {
    const { id, name, type_1, type_2, total, hp, attack, defense, spatk, spdef, speed, generation, legendary } = req.body
    let request = "";
    let params = []
    let index = 1;
    if (!!id) {
        //check each variable and update variable
        if (name) {
            request += `name = $${index++},`;
            params.push(name);
        }
        if (type_1) {
            request += `type_1 = $${index++},`;
            params.push(type_1);
        }
        if (type_2) {
            request += `type_2 = $${index++},`;
            params.push(type_2);
        }
        if (total) {
            request += `total = $${index++},`;
            params.push(total);
        }
        if (hp) {
            request += `hp = $${index++},`;
            params.push(hp);
        }
        if (attack) {
            request += `attack = $${index++},`;
            params.push(attack);
        }
        if (defense) {
            request += `defense = $${index++},`;
            params.push(defense);
        }
        if (spatk) {
            request += `spatk = $${index++},`;
            params.push(spatk);
        }
        if (spdef) {
            request += `spdef = $${index++},`;
            params.push(spdef);
        }
        if (speed) {
            request += `speed = $${index++},`;
            params.push(speed);
        }
        if (generation) {
            request += `generation = $${index++},`;
            params.push(generation);
        }
        if (legendary) {
            request += `legendary = $${index++},`;
            params.push(legendary);
        }
        if (index === 1) {
            // si on a aucune var
            res.status(400).json({ error: "not valid object send" })
        } else {
            // on retire la virgule final
            request = request.slice(0, -1);
            params.push(id);
            // on fais la requete
            db.query(`UPDATE pokemons set ${request} WHERE id = $${index} RETURNING *`, params)
                .then(result => {
                    if (result.rows.length === 0) {
                        // on update rien
                        res.status(400).json({ result: "error", error: "id not exist" })
                    } else {
                        // on a reussi a update
                        res.status(201).json({ result: "success", insert: result.rows })
                    }
                })
                .catch(result => {
                    console.log(result)
                    res.status(400).json({ result: "error" })
                })
        }
    } else {
        // l'id n'a pas été remplie
        res.status(400).json({ error: "not valid object send" })
    }
});

// init controller user and generate controler

app.post('/login', (req, res) => {
    const Usercontrollers = require('./controllers/UserController');
    const userController = new Usercontrollers(db);
    userController.login(req, res)
});
app.post('/register', (req, res) => {
    const Usercontrollers = require('./controllers/UserController');
    const userController = new Usercontrollers(db);
    userController.register(req, res)
});

// open server on server 3000
app.listen(3000, () => {
    console.log("server started on port 3000");
});