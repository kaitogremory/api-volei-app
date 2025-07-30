const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const Team = require('../models/Team');

// GET all sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find()
        .populate('players')
        .populate('playersGone')
        .populate('teams')
        .sort({ date: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET active session
router.get('/active', async (req, res) => {
  try {
    const session = await Session.findOne({ closed: false })
      .populate('players')
      .populate('playersGone')
      .populate({
        path: 'teams',
        populate: {
          path: 'players',
          model: 'Player'
        }
      });

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST create session
router.post('/', async (req, res) => {
  try {    
    const session = await Session.create({
      players: req.body.players,
      playersGone: [],
      teams: [],
      closed: false,
    });
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT close session
router.put('/:id/close', async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, { closed: true }, { new: true });
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update 
router.put('/:id', async (req, res) => {
  try {    
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { 
        playersGone: req.body.playersGone,
        players: req.body.players 
      },
      { new: true }
    ).populate('players')
     .populate('playersGone')
     .populate('teams');

    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /sessions/active
router.get('/active', async (req, res) => {
  try {
    const session = await Session.findOne({ closed: false })
      .sort({ createdAt: -1 })
      .populate('players')
      .populate('playersGone')
      .populate('teams');
    
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /sessions/:id/teams
router.put('/:id/teams', async (req, res) => {
  try {
    const { teams } = req.body;

    // Cria os times no banco
    const createdTeams = await Promise.all(
      teams.map(team => {
        return new Team({
          name: team.name,
          players: team.players
        }).save();
      })
    );

    // Atualiza a sessão com os IDs dos times criados
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { teams: createdTeams.map(t => t._id) },
      { new: true }
    ).populate({
      path: 'teams',
      populate: {
        path: 'players',
        model: 'Player'
      }
    });

    if (!session) return res.status(404).json({ error: 'Session not found' });

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
