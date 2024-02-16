import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
  },
  arena: {
    type: {
      battles: Number,
      wins: Number,
      defeats: Number,
      draws: Number,
      damageInflicted: Number,
      damageReceived: Number,
      honorEarned: Number,
    },
    default: {
      battles: 0,
      wins: 0,
      defeats: 0,
      draws: 0,
      damageInflicted: 0,
      damageReceived: 0,
      honorEarned: 0,
    },
  },
  world: {
    type: {
      battles: Number,
      wins: Number,
      defeats: Number,
      draws: Number,
      damageInflicted: Number,
      damageReceived: Number,
      honorEarned: Number,
    },
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
  expeditions: {
    type: {
      grimwood: {
        rat: {
          knowledge: Number,
          battles: Number,
          wins: Number,
          defeats: Number,
          draws: Number,
        },
        lynx: {
          knowledge: Number,
          battles: Number,
          wins: Number,
          defeats: Number,
          draws: Number,
        },
        wolf: {
          knowledge: Number,
          battles: Number,
          wins: Number,
          defeats: Number,
          draws: Number,
        },
        bear: {
          knowledge: Number,
          battles: Number,
          wins: Number,
          defeats: Number,
          draws: Number,
        },
      },
      bandit: {
        slave: {
          knowledge: Number,
          battles: Number,
          wins: Number,
          defeats: Number,
          draws: Number,
        },
        mercenary: {
          knowledge: Number,
          battles: Number,
          wins: Number,
          defeats: Number,
          draws: Number,
        },
        berserker: {
          knowledge: Number,
          battles: Number,
          wins: Number,
          defeats: Number,
          draws: Number,
        },
        chief: {
          knowledge: Number,
          battles: Number,
          wins: Number,
          defeats: Number,
          draws: Number,
        },
      },
      crypt: {
        draug: {
          knowledge: Number,
          battles: Number,
          wins: Number,
          defeats: Number,
          draws: Number,
        },
        drowned: {
          knowledge: Number,
          battles: Number,
          wins: Number,
          defeats: Number,
          draws: Number,
        },
        ancient: {
          knowledge: Number,
          battles: Number,
          wins: Number,
          defeats: Number,
          draws: Number,
        },
        soulless: {
          knowledge: Number,
          battles: Number,
          wins: Number,
          defeats: Number,
          draws: Number,
        },
      },
    },
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