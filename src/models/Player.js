const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isMonthly: { type: Boolean, default: false }
}, { timestamps: true });

playerSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

playerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Player', playerSchema);
