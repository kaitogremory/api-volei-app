const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { timestamps: true });

// Create virtual "id" field
playerSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serializable
playerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Player', playerSchema);
