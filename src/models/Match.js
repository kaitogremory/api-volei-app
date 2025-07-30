const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Subdocumento simples e explícito
const embeddedTeamSchema = new Schema({
  name: { type: String, required: true },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  }]
}, { _id: false }); // evita criação de _id para o subdocumento

const matchSchema = new Schema({
  session: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  teamA: { type: embeddedTeamSchema, required: true },
  teamB: { type: embeddedTeamSchema, required: true },
  winner: { type: String, enum: ['A', 'B', 'draw'], required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
