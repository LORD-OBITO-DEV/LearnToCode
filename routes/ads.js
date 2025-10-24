const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

// --- Ajouter un point après avoir regardé une pub ---
router.post('/watched', auth, async (req, res) => {
  try {
    req.user.points += 1; // 1 point par pub
    await req.user.save();
    res.json({ message: 'Point ajouté', points: req.user.points });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
