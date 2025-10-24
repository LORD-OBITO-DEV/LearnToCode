const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma pour les exercices de chaque niveau
const ExerciseSchema = new Schema({
  question: String,
  type: { type: String, enum: ['mcq','code','short'], default: 'code' },
  options: [String],
  answer: Schema.Types.Mixed // peut être string, nombre, tableau selon type
});

// Schéma pour chaque niveau d'un cours
const LevelSchema = new Schema({
  number: Number, // niveau 1..10
  pricePoints: Number,
  title: String,
  content: String, // markdown ou HTML
  exercises: [ExerciseSchema]
});

// Schéma principal du cours
const CourseSchema = new Schema({
  slug: { type: String, unique: true },
  title: String,
  description: String,
  category: String, // html, css, js-web, js-bots, python
  levels: [LevelSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
