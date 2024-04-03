const router = require('express').Router();

// Import modular routers for /notes
const notesRouter = require('./notes.js');

router.use('/notes', notesRouter);

module.exports = router;
