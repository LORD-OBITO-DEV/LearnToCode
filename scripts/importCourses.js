const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.error('❌ Erreur MongoDB:', err));

const coursesDir = path.join(__dirname, '../courses');

async function importCourses() {
  const files = fs.readdirSync(coursesDir).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    const filePath = path.join(coursesDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const existing = await Course.findOne({ slug: data.slug });
    if (existing) {
      await Course.updateOne({ slug: data.slug }, data);
      console.log(`♻️  Mis à jour : ${data.slug}`);
    } else {
      await Course.create(data);
      console.log(`✅ Ajouté : ${data.slug}`);
    }
  }

  console.log('🎉 Tous les cours ont été importés');
  mongoose.connection.close();
}

importCourses();