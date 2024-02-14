import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
  },
  arena: {
    type: Object,
    default: {
      battles: 0,
      wins: 0,
      defeats: 0,
      draws: 0,
      damageInflicted: 0,
      damageReceived: 0,
      honourEarned: 0,
    },
  },
  world: {
    type: Object,
    default: {
      battles: 0,
      wins: 0,
      defeats: 0,
      draws: 0,
      damageInflicted: 0,
      damageReceived: 0,
      crownsEarned: 0,
    },
  },
  zones: {
    type: Object,
    default: {
      grimwood: {
        rat: {
          knowledge: 0,
          battles: 0,
          wins: 0,
          defeats: 0,
          draws: 0,
        },
        lynx: {
          knowledge: 0,
          battles: 0,
          wins: 0,
          defeats: 0,
          draws: 0,
        },
        wolf: {
          knowledge: 0,
          battles: 0,
          wins: 0,
          defeats: 0,
          draws: 0,
        },
        bear: {
          knowledge: 0,
          battles: 0,
          wins: 0,
          defeats: 0,
          draws: 0,
        },
      },
      bandit: {
        slave: {
          knowledge: 0,
          battles: 0,
          wins: 0,
          defeats: 0,
          draws: 0,
        },
        mercenary: {
          knowledge: 0,
          battles: 0,
          wins: 0,
          defeats: 0,
          draws: 0,
        },
        berserker: {
          knowledge: 0,
          battles: 0,
          wins: 0,
          defeats: 0,
          draws: 0,
        },
        chief: {
          knowledge: 0,
          battles: 0,
          wins: 0,
          defeats: 0,
          draws: 0,
        },
      },
      crypt: {
        draug: {
          knowledge: 0,
          battles: 0,
          wins: 0,
          defeats: 0,
          draws: 0,
        },
        drowned: {
          knowledge: 0,
          battles: 0,
          wins: 0,
          defeats: 0,
          draws: 0,
        },
        ancient: {
          knowledge: 0,
          battles: 0,
          wins: 0,
          defeats: 0,
          draws: 0,
        },
        soulless: {
          knowledge: 0,
          battles: 0,
          wins: 0,
          defeats: 0,
          draws: 0,
        },
      },
    }
  }
});

const Journal = mongoose.models.Journal || mongoose.model('Journal', journalSchema);

export default Journal;