const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

router.post('/', async (req, res) => {
  try {
    const newPlayer = await Player.create(req.body);
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Player.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isMonthly: req.body.isMonthly
    },
    { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Jogador não encontrado' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removed = await Player.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res.status(404).json({ error: 'Jogador não encontrado' });
    }
    res.json({ message: 'Jogador deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
