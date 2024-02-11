import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
  },
  crowns: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  experience: {
    type: Number,
    default: 0,
  },
  strength: {
    type: Number,
    default: 5,
  },
  dexterity: {
    type: Number,
    default: 5,
  },
  endurance: {
    type: Number,
    default: 5,
  },
  agility: {
    type: Number,
    default: 5,
  },
  intelligence: {
    type: Number,
    default: 5,
  },
  charisma: {
    type: Number,
    default: 5,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
});

const Character = mongoose.models.Character || mongoose.model('Character', characterSchema);

export default Character;