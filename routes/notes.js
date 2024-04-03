const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new notes
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      // activeNote.id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Notes added successfully`);
  } else {
    res.error('Error in adding notes');
  }
});

module.exports = notes;
