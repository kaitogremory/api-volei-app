const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const jogadoresRoutes = require('./routes/players');
app.use('/players', jogadoresRoutes);

module.exports = app;
