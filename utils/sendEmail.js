const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, html }) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true', // true pour port 465, false pour 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"LearnToCode" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    });

    console.log(`✅ Email envoyé à ${to}`);
  } catch (err) {
    console.error(`❌ Erreur envoi email à ${to}:`, err);
  }
}

module.exports = sendEmail;