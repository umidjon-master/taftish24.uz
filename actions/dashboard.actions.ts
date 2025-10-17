"use server";

import { connectToDatabase } from "@/lib/mongoose";
import CategoryCollection from "@/models/Category";
import NewsCollection from "@/models/News";

export async function getDashboardStats() {
  await connectToDatabase();

  // Parallel ravishda kategoriyalar, yangiliklar soni va jami ko‘rishlar
  const [categoryCount, newsCount, viewsSumResult] = await Promise.all([
    CategoryCollection.countDocuments(),
    NewsCollection.countDocuments(),
    NewsCollection.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]),
  ]);

  const totalViews = viewsSumResult[0]?.totalViews || 0;

  return {
    categoryCount,
    newsCount,
    totalViews,
  };
}
