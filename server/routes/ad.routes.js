import Router from "express";
const router = new Router();
import Ad from "../models/Ad.js";

router.post("/addNew", async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Uncorrect request", errors });
    }
    const {
      name,
      photo,
      category,
      price,
      priceDay,
      priceWeek,
      priceMonth,
      city,
      address,
      text
    } = req.body;
    const adnew = new Ad({
      name,
      photo,
      category,
      price,
      priceDay,
      priceWeek,
      priceMonth,
      city,
      address,
      text
    });
    await adnew.save();
    const savedAd = await adnew.save();
    res
      .status(200)
      .json({ message: "Ad был успешно создан :3", data: savedAd });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
  }
});

export default router;
