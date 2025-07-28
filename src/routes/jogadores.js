const express = require('express');
const router = express.Router();
const Jogador = require('../models/Jogador');
const autenticar = require('../middleware/auth');

// GET /jogadores
router.get('/', autenticar, async (req, res) => {
  const jogadores = await Jogador.find();
  res.json(jogadores);
});

// POST /jogadores
router.post('/', autenticar, async (req, res) => {
  try {
    const novoJogador = await Jogador.create(req.body);
    res.status(201).json(novoJogador);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

module.exports = router;
