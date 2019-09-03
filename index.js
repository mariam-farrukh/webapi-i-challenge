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
            })
    }
});

server.get('/api/users', (req, res) => {
    Users.find()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(() => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
});

server.get('/api/users/:id', (req,res) => {
    Users.findById(req.params.id)
        .then(user => {
            if(!user){
                res.status(404).json({ error: 'The user with the specified ID does not exist.' });
            } else {
                res.json(user);
            }
        })
        .catch(() => {
            res.status(500).json({error: "The user information could not be retrieved."})
        })
});

server.delete('/api/users/:id', (req, res) => {
    Users.remove(req.params.id)
    .then(user => {
        if (!user) {
            res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
        } else {
            res.status(200).json(user);
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The user could not be removed" });
    })
});

server.put('/api/users/:id', (req, res)=> {
    const { name, bio} = req.body;
    if(!name || ! bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    } else {
        Users.update(req.params.id, req.body)
        .then(user => {
            if (user){
                res.status(200).json(user);
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."});
            }
        })
        .catch(()=> {
            res.status(500).json({error: "The user information could not be modified."})
        })
    }
})

const port = 5000;
server.listen(port, ()=> console.log(`\n API on http://localhost:${port} \n`));