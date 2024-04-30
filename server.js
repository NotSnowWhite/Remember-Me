const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

const PORT = 8080;

// middleware to parse json
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/api/notes' (req, res) => {
    
})
app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
});