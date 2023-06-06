const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Yandex',
  auth: {
    user: 'your-yandex-email@example.com',
    pass: 'your-yandex-password'
  }
});

const sendEmailToOwner = (email, name, message) => {
  const ownerEmail = req.body.email;

  const mailOptions = {
    from: email,
    to: ownerEmail,
    subject: `Сообщение от ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendEmailToOwner;