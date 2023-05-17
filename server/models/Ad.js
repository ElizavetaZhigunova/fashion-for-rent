import { Schema, model } from "mongoose";

const AdSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String },
    photo: { type: String },
    category: { type: String },
    price: { type: String },
    priceDay: { type: String },
    priceWeek: { type: String },
    priceMonth: { type: String },
    city: { type: String },
    address: { type: String },
    text: {type: String},
    viewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Ad", AdSchema);
