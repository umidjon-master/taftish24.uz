import { Schema, model, models, Types } from "mongoose";

const TranslationSchema = new Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
  },
  { _id: false }
);

const NewsSchema = new Schema(
  {
    translations: {
      uz: { type: TranslationSchema, required: true },
      ru: { type: TranslationSchema, required: true },
    },
    image: { type: String, required: true },
    category: {
      type: Types.ObjectId,
      ref: "CategoryCollection",
      required: true,
    },
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NewsCollection =
  models.NewsCollection || model("NewsCollection", NewsSchema);

export default NewsCollection;
