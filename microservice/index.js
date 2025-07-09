// microservice/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post('/notify/email', async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: 'to, subject e (text ou html) são obrigatórios' });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
      html
    });

    return res.json({ success: true });
  } catch (err) {
    console.error('Falha ao enviar e-mail:', err);
    return res.status(500).json({ error: 'Falha ao enviar e-mail' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Notification service rodando na porta ${port}`));
