const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  players: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Player' 
  }],
  playersGone: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Player' 
  }],
  teams: [{ 
    name: String, 
    players: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Player' 
    }]
  }],
  closed: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

sessionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

sessionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Session', sessionSchema);
