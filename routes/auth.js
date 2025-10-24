const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/User');
const { sendWelcomeEmail, sendResetCodeEmail } = require('../utils/mailer');

// Générer un code de parrainage unique
function generateReferralCode() {
  return 'LTC' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

// --- Inscription ---
router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, name, ref } = req.body;
    try {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      let code = generateReferralCode();
      while (await User.findOne({ referralCode: code })) code = generateReferralCode();

      const user = new User({ email, name, passwordHash: hash, referralCode: code });

      if (ref) {
        const sponsor = await User.findOne({ referralCode: ref });
        if (sponsor) {
          user.referredBy = sponsor.referralCode;
          sponsor.points += 5; // récompense du parrain
          await sponsor.save();
        }
      }

      await user.save();

      // Envoyer email de bienvenue
      await sendWelcomeEmail(user.email, user.name || 'Apprenant', user.referralCode);

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { email: user.email, name: user.name, points: user.points, referralCode: user.referralCode } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
);

// --- Connexion ---
router.post('/login',
  body('email').isEmail(),
  body('password').exists(),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { email: user.email, name: user.name, points: user.points, referralCode: user.referralCode } });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
);

// --- Demande de réinitialisation ---
router.post('/request-reset',
  body('email').isEmail(),
  async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Email inconnu' });

      const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 chiffres
      const hash = crypto.createHash('sha256').update(code).digest('hex');
      user.resetCodeHash = hash;
      user.resetCodeExpiry = Date.now() + 15 * 60 * 1000; // 15 min
      await user.save();

      await sendResetCodeEmail(user.email, user.name || '', code);
      res.json({ message: 'Code envoyé par email' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
);

// --- Réinitialisation du mot de passe ---
router.post('/reset-password',
  body('email').isEmail(),
  body('code').isLength({ min: 6, max: 6 }),
  body('newPassword').isLength({ min: 6 }),
  async (req, res) => {
    const { email, code, newPassword } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Email inconnu' });
      if (!user.resetCodeHash || !user.resetCodeExpiry) return res.status(400).json({ message: 'Aucun code demandé' });
      if (Date.now() > user.resetCodeExpiry) return res.status(400).json({ message: 'Code expiré' });

      const hash = crypto.createHash('sha256').update(code).digest('hex');
      if (hash !== user.resetCodeHash) return res.status(400).json({ message: 'Code invalide' });

      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(newPassword, salt);
      user.resetCodeHash = null;
      user.resetCodeExpiry = null;
      await user.save();

      res.json({ message: 'Mot de passe réinitialisé' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
);

module.exports = router;
