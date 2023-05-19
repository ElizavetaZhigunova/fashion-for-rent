import express from "express";
import mongoose from "mongoose";
import config from "config";
import multer from "multer";
import cors from "./middleware/cors.middleware.js";
import authRouter from './routes/auth.routes.js'
import { AdController, UserController } from "./controllers/index.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

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

const storageAvatar = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "avatars");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const avatar = multer({ storageAvatar });

app.use(cors);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/avatars", express.static("avatars"));

app.use("", authRouter)

app.patch("/profile/:id", authMiddleware, UserController.updateProfile);

app.post("/AddNew", authMiddleware, AdController.create);
app.delete("/AddNew/:id", authMiddleware, AdController.remove);
app.patch("/AddNew/:id", authMiddleware, AdController.update);

app.get("/AddNew", AdController.getAll);
app.get("/AddNew/:id", AdController.getOne);
app.get("/category", AdController.getLastCategory);
app.get("/AddNew/category", AdController.getLastCategory);

app.post("/upload", authMiddleware, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post("/avatar", authMiddleware, avatar.single("image"), (req, res) => {
  res.json({
    url: `/avatars/${req.file.originalname}`,
  });
});

const start = async () => {
  try {
    mongoose.connect(config.get("dbUrl2"));

    app.listen(PORT, () => {
      console.log("Server started on port ", PORT);
    });
  } catch (error) {
    consolr.log(error);
  }
};

start();
