const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("<h1>Welcome to EJS world!</h1>");
});

app.get("/pokemons", (req, res) => {
    const pokemons = require('./pokemon.json')
    res.status(200).json(pokemons)
});

app.get('/pokemon/:id', (req, res) => {
    const pokemons = require('./pokemon.json')
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    res.status(200).json(pokemon)
})

app.post('/pokemon', (req, res) => {
    const fs = require('fs');
    const pokemons = require('./pokemon.json')
    let check = true;
    const need = ["Name", "Type 1", "Type 2", "Total", "HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed", "Generation", "Legendary"];
    if (Object.keys(req.body).length !== need.length) {
        check = false;
    } else {
        for (const property in req.body) {
            if (!need.includes(property)) {
                check = false;
                break;
            }
        }
    }
    if (check) {
        const last_id = pokemons[pokemons.length - 1].id;
        req.body = { id: StringIdtoInt(last_id) + 1, ...req.body };
        pokemons.push(req.body);
        fs.writeFile('./pokemon.json', JSON.stringify(pokemons, null, 4), err => {
            if (err) {
                res.status(500).json({ error: "An error is occurr" })
                console.log(err)
            }
            res.status(201).json({ result: "success" })
        });
    } else {
        res.status(400).json({ error: "not valid object send" })
    }
})

app.put('/pokemon', (req, res) => {
    const pokemons = require('./pokemon.json')
    res.json({ requestBody: req.body });
    // pokemons.push(req.body);
    // res.status(201).json({ result: "sucess" })
})


app.listen(3000, () => {
    console.log("server started on port 3000");
});

function StringIdtoInt(str) {
    return parseInt(str.replace(/m|a/g, ""));
}