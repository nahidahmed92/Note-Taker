// DEPENDENCIES ======================================
const express = require('express');
const path = require('path');

// DATA ==============================================

// APP/PORT ==========================================
const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES =======================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES ============================================
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// START THE SERVER ==================================
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
