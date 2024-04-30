const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

const PORT = 8080;

// middleware to parse json
app.use(express.json());

// middleware to serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        }
        const notes = JSON.parse(data);
        res.json(notes)
    })
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        }
        const notes = JSON.parse(data);

        newNote.id = notes.length + 1;
        notes.push(newNote);
        console.log(newNote.id);

        fs.writeFile('db.json', JSON.stringify(notes, null, 4), (err) => {
            if (err) {
                console.error(err);
            }

            res.json(newNote);
        });
    })
});

// listening for requests 
app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
});