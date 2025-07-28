const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const autenticar = require('../middleware/auth');

// GET /usuarios/inserir-teste
router.get('/inserir-teste', autenticar, checkRole('admin', 'jogador'), async (req, res) => {
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
router.get('/', autenticar, checkRole('admin', 'jogador'), async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
