const mongoose = require('mongoose');

const JogadorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  nivel: { type: String, enum: ['A', 'B', 'C'], required: true },
});

module.exports = mongoose.model('Jogador', JogadorSchema);
