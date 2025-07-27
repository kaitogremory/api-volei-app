const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// GET /usuarios/inserir-teste
router.get('/inserir-teste', async (req, res) => {
  try {
    const novo = await Usuario.create({
      nome: 'Caio Teste',
      email: 'caio@example.com'
    });
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// GET /usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
