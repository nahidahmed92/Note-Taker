const notes = require('express').Router();
const { readFromFile, readAndAppend, deleteAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');
const path = require('path');

// GET Route for retrieving all notes
notes.get('/', async (req, res) => {
  try {
    const data = await readFromFile(path.join(__dirname, '../public/db/db.json'));
    // Directly send the data, no need to parse again
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error reading notes', error: err.message });
  }
});

// POST Route for a new notes
notes.post('/', async (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    try {
      await readAndAppend(newNote, path.join(__dirname, '../public/db/db.json'));
      res.status(201).json({ message: 'Note added successfully' });
    } catch {
      res.status(500).json({ message: 'Error in adding note' });
    }
  } else {
    res.status(400).json({ message: 'Invalid input' });
  }
});

// DELETE Route for selected note
notes.delete('/:id', async (req, res) => {
  const deleteId = req.params.id;

  if (deleteId) {
    try {
      await deleteAndAppend(deleteId, path.join(__dirname, '../public/db/db.json'));
      res.status(200).json({ message: `Note with ID ${deleteId} deleted successfully` });
    } catch {
      res.status(500).json({ message: 'Error in deleting note' });
    }
  } else {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

module.exports = notes;
