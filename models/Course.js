const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  title: { type: String, required: true },
  question: { type: String, required: true },
  correctAnswer: { type: String, required: true }
});

const LevelSchema = new Schema({
  number: { type: Number, required: true },
  pricePoints: { type: Number, required: true },
  content: { type: String, required: true },
  exercises: [ExerciseSchema]
});

const CourseSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  levels: [LevelSchema]
});

module.exports = mongoose.model('Course', CourseSchema);