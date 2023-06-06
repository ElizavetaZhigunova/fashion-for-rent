import AdModel from "../models/Ad.js";
import { validationResult } from "express-validator";

export const getLastCategory = async (req, res) => {
  try {
    const ads = await AdModel.find().limit(5).exec();

    const category = ads.map((obj) => obj.category).flat();

    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить объявления",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const ads = await AdModel.find().populate("user").exec();
    res.json(ads);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить объявления",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const adId = req.params.id;

    AdModel.findOneAndUpdate(
      {
        _id: adId,
      },
      {
        $inc: { viewsCount: 1 },
      }
    ).populate("user")
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ message: "Объявление не найдено" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить объявления",
    });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ message: "Нет переданных параметров." });
  }
  AdModel.findById(id)
    .orFail(() => res.status(404).send("Ad не найдено."))
    .then((ad) => {
      ad.remove()
        .then(() => {
          res.status(200).send({ message: "Ad успешно удален." });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ message: "Ошибка удаления ad." });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Ошибка поиска ad." });
    });
};

export const create = async (req, res) => {
  try {
    const doc = new AdModel({
      name: req.body.name,
      photo: req.body.photo,
      category: req.body.category,
      price: req.body.price,
      priceDay: req.body.priceDay,
      priceWeek: req.body.priceWeek,
      priceMonth: req.body.priceMonth,
      city: req.body.city,
      address: req.body.address,
      text: req.body.text,
      user: req.user.id,
    });

    const ad = await doc.save();
    const message = "Объявление успешно создано";
    res.status(200).json({ message, ad });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать объявление",
    });
  }
};

export const update = async (req, res) => {
  try {
    const adId = req.params.id;
    await AdModel.updateOne(
      {
        _id: adId,
      },
      {
        name: req.body.name,
        photo: req.body.photo,
        category: req.body.category,
        price: req.body.price,
        priceDay: req.body.priceDay,
        priceWeek: req.body.priceWeek,
        priceMonth: req.body.priceMonth,
        text: req.body.text
      }
    )
      .then(() => {
        res.status(200).send({ message: "Объявление успешно обновлено." });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Ошибка редактирования." });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось обновить объявление." });
  }
};
