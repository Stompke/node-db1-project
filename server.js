const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'you made it!' });
})

server.get('/api/accounts', (req, res) => {
    db('accounts')
    .then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to get from accounts' });
    })
})

server.get('/api/accounts/:id', (req, res) => {
    db.select('*').from('accounts').where({ id: req.params.id})
    .then(account => {
        res.status(200).json(account);
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to get from accounts' });
    })
})

server.post('/api/accounts', (req, res) => {
    db('accounts').insert(req.body, 'id')
    .then(account => {
        res.status(201).json(account);
    })
    .catch(err => {
        res.status(500).json({ error: 'Could not add account' });
    })
})

server.put('/api/accounts/:id', (req, res) => {
    db('accounts').where({ id: req.params.id }).update(req.body)
    .then(account => {
        res.status(201).json(account);
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error updating that account." })
    })
})

server.delete('/api/accounts/:id', (req, res) => {
    db('accounts').where({ id: req.params.id }).del()
    .then(account => {
        res.status(200).json(account);
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error deleting that account." });
    })
})

module.exports = server;