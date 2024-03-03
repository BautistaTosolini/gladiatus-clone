import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['head', 'chest', 'gloves', 'legs', 'boots', 'mainHand', 'offHand', 'necklace', 'ring']
  },
  level: {
    type: Number,
    required: true,
  },
  damage: {
    type: [Number],
  },
  armor: {
    type: Number,
  },
  strength: {
    type: Number,
  },
  endurance: {
    type: Number,
  },
  agility: {
    type: Number,
  },
  dexterity: {
    type: Number,
  },
  intelligence: {
    type: Number,
  },
  charisma: {
    type: Number,
  },
  power: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'Character',
  },
  sellPrice: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default Item;