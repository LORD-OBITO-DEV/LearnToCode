const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware d'authentification
async function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Pas auth' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token invalide' });
  }
}

// --- Lister tous les cours ---
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// --- Obtenir un cours par slug ---
router.get('/:slug', async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).json({ message: 'Cours non trouvé' });
  res.json(course);
});

// --- Acheter un niveau d'un cours ---
router.post('/:slug/buy/:level', auth, async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) return res.status(404).json({ message: 'Cours introuvable' });

    const levelNum = parseInt(req.params.level, 10);
    const level = course.levels.find(l => l.number === levelNum);
    if (!level) return res.status(400).json({ message: 'Niveau invalide' });

    if (req.user.points < level.pricePoints) return res.status(400).json({ message: 'Points insuffisants' });

    req.user.points -= level.pricePoints;
    if (!req.user.purchasedCourses.includes(course._id)) req.user.purchasedCourses.push(course._id);
    await req.user.save();

    res.json({ message: 'Niveau débloqué', points: req.user.points });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
