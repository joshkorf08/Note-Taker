const fs = require('fs');
const express = require('express');

const notes = require('./notes.js');
const path = require('path');

const app = express();
var PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get("/api/notes", (req, res) => {
    notes.getNotes().then(data => {
        return res.json(data);
    });
});
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    notes.addNotes(newNote).then(data => res.json(data));
});
app.delete("/api/notes/:id", (req, res) => {
    notes.deleteNotes(req.params.id).then(() => res.json({ ok:true }));
});
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "../public/assets/notes.html")));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../public/assets/index.html")));

app.listen(PORT, () => console.log(`We are live on port ${PORT}`));