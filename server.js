// DEPENDENCIES ======================================
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// DATA ==============================================

// APP/PORT ==========================================
const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES =======================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// ROUTES ============================================
// GET Route for homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// GET Route for notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// START THE SERVER ==================================
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
