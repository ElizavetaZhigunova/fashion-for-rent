import express from "express";
import mongoose from "mongoose";
import config from "config";
import multer from "multer";
import cors from "./middleware/cors.middleware.js";
import authRouter from './routes/auth.routes.js'
import { AdController, UserController } from "./controllers/index.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

import nodemailer from 'nodemailer'
import bodyParser from 'body-parser'

const app = express();
const PORT = config.get("serverPort");

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post("/upload", authMiddleware, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post("/avatar", authMiddleware, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});


app.use(cors);
app.use(express.json());
app.use(bodyParser.json());


app.use("", authRouter)

app.patch("/profile/:id", authMiddleware, UserController.updateProfile);

app.post("/AddNew", authMiddleware, AdController.create);
app.delete("/AddNew/:id", authMiddleware, AdController.remove);
app.patch("/AddNew/:id", authMiddleware, AdController.update);

app.get("/AddNew", AdController.getAll);
app.get("/AddNew/:id", AdController.getOne);
app.get("/category", AdController.getLastCategory);
app.get("/AddNew/category", AdController.getLastCategory);




// app.post('/send-message', async (req, res) => {
//   const { message, email } = req.body;
// let testAccount = await nodemailer.createTestAccount();
//   const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

  

//   const mailOptions = {
//     from: testAccount.user,
//     to: 'zhigunova_03@inbox.ru',
//     subject: 'Сообщение с сайта',
//     text: message,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log(`Сообщение отправлено: ${info.messageId}`, testAccount.user);
//     res.send('Сообщение успешно отправлено');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Ошибка отправки сообщения');
//   }
// });

// app.post('/send-email', function(req, res) {
//   const { recipient, subject, text } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'fashion-f-rent@gmail.com',
//       pass: 'EsGxclhz1#'
//     }
//   });

//   const mailOptions = {
//     from: 'fashion-f-rent@gmail.com',
//     to: recipient,
//     subject: subject,
//     text: text
//   };

//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       console.log(error);
//       res.send('error', error);
//     } else {
//       console.log('Email sent: ' + info.response);
//       res.send('success');
//     }
//   });
// });


const start = async () => {
  try {
    mongoose.connect(config.get("dbUrl3"));

    app.listen(PORT, () => {
      console.log("Server started on port ", PORT);
    });
  } catch (error) {
    consolr.log(error);
  }
};

start();
