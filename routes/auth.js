const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail'); // fonction pour envoyer les mails

// POST /auth/register
router.post('/register', async (req, res) => {
  const { email, password, name, referralCode } = req.body;

  try {
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email déjà utilisé' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      name,
      passwordHash,
      referralCode: crypto.randomBytes(4).toString('hex'),
      referredBy: referralCode || null
    });

    // Si referralCode existe, ajouter 5 points au parrain
    if (referralCode) {
      const refUser = await User.findOne({ referralCode });
      if (refUser) {
        refUser.points += 5;
        await refUser.save();
      }
    }

    await newUser.save();

    // Envoi mail de bienvenue
    sendEmail({
      to: email,
      subject: 'Bienvenue sur LearnToCode !',
      html: `<h1>Bienvenue ${name}</h1><p>Votre compte a été créé avec succès.</p>`
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, points: newUser.points });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, points: user.points });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST /auth/request-reset
router.post('/request-reset', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email non trouvé' });

    const resetCode = crypto.randomInt(100000, 999999).toString();
    const salt = await bcrypt.genSalt(10);
    user.resetCodeHash = await bcrypt.hash(resetCode, salt);
    user.resetCodeExpiry = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    sendEmail({
      to: email,
      subject: 'Code de réinitialisation',
      html: `<p>Votre code de réinitialisation est : <b>${resetCode}</b></p>`
    });

    res.json({ message: 'Code envoyé par email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST /auth/reset-password
router.post('/reset-password', async (req, res) => {
  const { email, resetCode, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email non trouvé' });
    if (!user.resetCodeHash || !user.resetCodeExpiry || Date.now() > user.resetCodeExpiry) {
      return res.status(400).json({ message: 'Code expiré ou invalide' });
    }

    const isMatch = await bcrypt.compare(resetCode, user.resetCodeHash);
    if (!isMatch) return res.status(400).json({ message: 'Code invalide' });

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.resetCodeHash = null;
    user.resetCodeExpiry = null;
    await user.save();

    res.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;