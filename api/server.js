const express = require('express');
const User = require('./user-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({api: 'up'})
});

// curl -d '{"name": "tester", "bio": "tester bio"}' -H 'Content-Type: application/json' -X POST http://localhost:5000/api/users
server.post('/api/users', async (req, res) => {
    const user = req.body;
    if(!user.name || !user.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        try {
            const newUser = await User.create(user);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database." });
        }
    }
});

// curl -X GET http://localhost:5000/api/users
server.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }
});

// curl -X GET http://localhost:5000/api/users/:id
server.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) 
            res.status(404).json({ message: `The user with the id ${id} does not exist.` });
        else 
            res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved."});
    }
});

// curl -X DELETE http://localhost:5000/api/users/:id
server.delete('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.delete(id);
        if (!user) 
            res.status(404).json({ message: `The user with the id ${id} does not exist.` });
        else 
            res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ errorMessage: "The user could not be removed."});
    }
});

// curl -d '{"name": "name", "bio": "bio"}' -H 'Content-Type: application/json' -X PUT http://localhost:5000/api/users/:id
server.put('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (!changes.name || !changes.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        try {
            const users = await User.update(id, changes);
            if (!users) 
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            else
                res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ errorMessage: "The user information could not be modified."});
        }
    }
});

module.exports = server;