const notes = require('express').Router();
const { readFromFile, readAndAppend, deleteAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new notes
notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Notes added successfully`);
  } else {
    res.error('Error in adding notes');
  }
});

notes.delete('/:id', (req, res) => {
  // ID from route parameters
  const deleteId = req.params.id;

  if (deleteId) {
    deleteAndAppend(deleteId, './db/db.json');
    // Send a 200 response after successful deletion
    res.status(200).json({ message: `Note with ID ${deleteId} deleted successfully` });
  } else {
    res.error('Note not deleted');
  }
});

module.exports = notes;
