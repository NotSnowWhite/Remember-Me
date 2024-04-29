const fs = require('fs');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

// middleware to parse json
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});