const express = require('express');
const cors = require('cors');
const jogadoresRoutes = require('./routes/jogadores');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/jogadores', jogadoresRoutes);

const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

module.exports = app;
