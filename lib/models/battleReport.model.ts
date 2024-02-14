import mongoose from 'mongoose';

const battleReportSchema = new mongoose.Schema({
  result: {
    type: {
      winner: String,
      attackerFinalHealth: Number,
      defenderFinalHealth: Number,
      attackerTotalDamage: Number,
      defenderTotalDamage: Number,
      attackerHealth: Number,
      defenderHealth: Number,
      honorEarned: Number,
      honorLost: Number,
      experienceDrop: Number,
      crownsDrop: Number,
    }
  },
  rounds: {
    type: [{
      roundNumber: Number,
      attackerHP: Number,
      defenderHP: Number,
      events: [String],
    }]
  },
  zone: {
    type: String,
  },
  defender: {
    type: mongoose.Schema.Types.Mixed, 
    refPath: 'defenderType',
  },
  defenderType: {
    type: String,
    enum: ['Character', 'Enemy'],
  },
  attacker: {
    type: mongoose.Types.ObjectId,
    ref: 'Character',
  },
  honorEarned: {
    type: Number,
  },
  honorLost: {
    type: Number,
  },
}, {
  timestamps: true
});

const BattleReport = mongoose.models.BattleReport || mongoose.model('BattleReport', battleReportSchema);

export default BattleReport;