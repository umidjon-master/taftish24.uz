import { Schema, model, models } from "mongoose";

const CategoryTranslationSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { _id: false }
);

const CategorySchema = new Schema(
  {
    translations: {
      uz: { type: CategoryTranslationSchema, required: true },
      ru: { type: CategoryTranslationSchema, required: true },
    },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);
const CategoryCollection =
  models.CategoryCollection || model("CategoryCollection", CategorySchema);

export default CategoryCollection;
