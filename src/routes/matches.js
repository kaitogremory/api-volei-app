const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// POST /matches
router.post('/', async (req, res) => {
  try {
    const { session, teamA, teamB, winner } = req.body;

    if (!session || !teamA || !teamB || !winner) {
      return res.status(400).json({ error: 'Dados incompletos para registrar a partida.' });
    }

    const match = await Match.create({
      session,
      teamA,
      teamB,
      winner
    });

    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
