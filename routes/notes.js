const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
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
  // ID is passed as a route parameter
  const deleteId = req.params.id;

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read data file.' });
    }

    let parsedData = JSON.parse(data);

    // Find index of the note with the given ID
    const indexOfId = parsedData.findIndex((note) => note.id === deleteId);

    if (indexOfId === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Remove the note from the array
    parsedData.splice(indexOfId, 1);

    // Write the updated array back to the file
    fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update data file.' });
      }
      res.json(`Note with ID ${deleteId} deleted successfully`);
    });
  });
});

module.exports = notes;
