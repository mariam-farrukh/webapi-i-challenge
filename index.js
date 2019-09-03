const express = require('express');
const Users = require('./data/db');

const server = express();
server.use(express.json());

server.post('/api/users', (req, res)=> {
    const {name, bio} = req.body;
    if( !name || !bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });

    } else {
        Users.insert(req.body)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(()=> {
                res.status(500).json({ error: "There was an error while saving the user to the database" });
            });
    }
});

server.get('/api/users', (req, res) => {
    Users.find()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(() => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        });
});

const port = 5000;
server.listen(port, ()=> console.log(`\n API on http://localhost:${port} \n`));