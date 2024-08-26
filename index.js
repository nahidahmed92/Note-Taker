// DEPENDENCIES ======================================
const cors = require('cors');
const express = require('express');
const path = require('path');

const api = require('./routes/index.js');

// DATA ==============================================
const corsOptions = {
  origin: 'https://note-taker.nahidahmed.com',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

// APP/PORT ==========================================
const app = express();
const port = process.env.PORT || 3001;

// MIDDLEWARES =======================================
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static(path.join(__dirname, 'public')));

// ROUTES ============================================
// GET Route for homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// GET Route for notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// START THE SERVER ==================================
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
