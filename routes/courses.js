const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// GET all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// GET single course by slug
router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) return res.status(404).json({ message: 'Cours non trouvé' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST mark exercise complete and add points
router.post('/:slug/complete', authMiddleware, async (req, res) => {
  const { levelNumber, exerciseIndex } = req.body;
  const userId = req.user.id;

  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) return res.status(404).json({ message: 'Cours non trouvé' });

    const level = course.levels.find(l => l.number === levelNumber);
    if (!level) return res.status(404).json({ message: 'Niveau non trouvé' });

    const exercise = level.exercises[exerciseIndex];
    if (!exercise) return res.status(404).json({ message: 'Exercice non trouvé' });

    const user = await User.findById(userId);

    // Vérifier si l'exercice est déjà complété
    const alreadyCompleted = user.completedExercises.some(e =>
      e.courseSlug === course.slug &&
      e.levelNumber === levelNumber &&
      e.exerciseIndex === exerciseIndex
    );

    if (alreadyCompleted) return res.status(400).json({ message: 'Exercice déjà complété' });

    // Ajouter l'exercice complété
    user.completedExercises.push({ courseSlug: course.slug, levelNumber, exerciseIndex });
    
    // Vérifier si le niveau est complété
    const exercisesCompletedInLevel = user.completedExercises.filter(e =>
      e.courseSlug === course.slug && e.levelNumber === levelNumber
    );

    if (exercisesCompletedInLevel.length === level.exercises.length) {
      user.completedLevels.push({ courseSlug: course.slug, levelNumber });
    }

    // Ajouter les points
    user.points += level.pricePoints;
    await user.save();

    res.json({ message: 'Exercice complété !', points: user.points });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;