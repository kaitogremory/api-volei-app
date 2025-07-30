// models/Match.js
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  teamA: {
    name: String,
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  },
  teamB: {
    name: String,
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  },
  winner: { type: String, enum: ['A', 'B', 'draw'], required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
