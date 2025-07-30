// routes/matches.js
const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// POST /matches
router.post('/', async (req, res) => {
  try {
    const { sessionId, teamA, teamB, winner, date } = req.body;
    

    if (!sessionId || !teamA || !teamB || !winner) {
      return res.status(400).json({ error: 'Dados incompletos.' });
    }

    const teamAPlayers = (teamA.players || []).map(p => {
        if (typeof p === 'string') return p;
        if (typeof p === 'object' && (p._id || p.id)) return p._id || p.id;
        throw new Error('Jogador inválido em teamA');
    });

    const teamBPlayers = (teamB.players || []).map(p => {
        if (typeof p === 'string') return p;
        if (typeof p === 'object' && (p._id || p.id)) return p._id || p.id;
        throw new Error('Jogador inválido em teamB');
    });


    const match = await Match.create({
      session: sessionId,
      teamA: { name: teamA.name, players: teamAPlayers },
      teamB: { name: teamB.name, players: teamBPlayers },
      winner,
      date: date || new Date()
    });

    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
