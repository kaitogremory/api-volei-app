const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const playersRoutes = require('./routes/players');
app.use('/players', playersRoutes);

const sessionRoutes = require('./routes/sessions');
app.use('/sessions', sessionRoutes);


module.exports = app;
