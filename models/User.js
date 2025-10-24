const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, default: '' },
  passwordHash: { type: String, required: true },
  points: { type: Number, default: 0 },
  referralCode: { type: String, unique: true },
  referredBy: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  resetCodeHash: { type: String, default: null },
  resetCodeExpiry: { type: Date, default: null },
  purchasedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  role: { type: String, enum: ['user','admin'], default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);
