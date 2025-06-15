const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourgmail@gmail.com',
      pass: 'your-app-password' // Use app-specific password if 2FA is on
    }
  });

  const mailOptions = {
    from: email,
    to: 'yourgmail@gmail.com',
    subject: `Portfolio Contact from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(500).send('Error sending email.');
    } else {
      res.status(200).send('Message sent successfully!');
    }
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
