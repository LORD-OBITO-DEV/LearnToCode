const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const adsRoutes = require('./routes/ads');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/ads', adsRoutes);

// Connexion à MongoDB et démarrage du serveur
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connecté');
    app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
  })
  .catch(err => console.error('❌ Erreur MongoDB :', err));
