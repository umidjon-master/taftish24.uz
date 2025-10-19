"use server";

import { connectToDatabase } from "@/lib/mongoose";
import CategoryCollection from "@/models/Category";
import NewsCollection from "@/models/News";

export async function getDashboardStats() {
  await connectToDatabase();

  const [categoryCount, newsCount, newsDocs] = await Promise.all([
    CategoryCollection.countDocuments(),
    NewsCollection.countDocuments(),
    NewsCollection.find({}, { views: 1 }).lean(),
  ]);

  const totalViews = newsDocs.reduce(
    (sum, doc) => sum + (Number(doc.views) || 0),
    0
  );

  return {
    categoryCount,
    newsCount,
    totalViews,
  };
}
