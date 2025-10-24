const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true si port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Fonction pour envoyer email de bienvenue
async function sendWelcomeEmail(to, name, referralCode) {
  const template = fs.readFileSync(path.join(__dirname, '../templates/welcome.html'), 'utf8');
  const html = template
    .replace(/{{name}}/g, name)
    .replace(/{{referralCode}}/g, referralCode);

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject: 'Bienvenue sur LearnToCode !',
    html
  });
}

// Fonction pour envoyer le code de réinitialisation
async function sendResetCodeEmail(to, name, code) {
  const template = fs.readFileSync(path.join(__dirname, '../templates/reset.html'), 'utf8');
  const html = template
    .replace(/{{name}}/g, name)
    .replace(/{{code}}/g, code);

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject: 'Réinitialisation de mot de passe',
    html
  });
}

module.exports = { sendWelcomeEmail, sendResetCodeEmail };
