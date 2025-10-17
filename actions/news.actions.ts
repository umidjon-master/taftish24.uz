"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongoose";
import NewsCollection from "@/models/News";
import CategoryCollection from "@/models/Category";

export async function createNews(data: any) {
  await connectToDatabase();

  const news = await NewsCollection.create({
    translations: {
      uz: { title: data.uzTitle, excerpt: data.uzExcerpt },
      ru: { title: data.ruTitle, excerpt: data.ruExcerpt },
    },
    image: data.image,
    category: data.categoryId,
    isPublished: data.isPublished || false,
  });

  revalidatePath("/admin/create-news");
  return JSON.parse(JSON.stringify(news));
}

export async function updateNews(id: string, data: any) {
  await connectToDatabase();

  await NewsCollection.findByIdAndUpdate(id, {
    translations: {
      uz: { title: data.uzTitle, excerpt: data.uzExcerpt },
      ru: { title: data.ruTitle, excerpt: data.ruExcerpt },
    },
    image: data.image,
    category: data.categoryId,
    isPublished: data.isPublished,
  });

  revalidatePath("/admin/create-news");
}

export async function deleteNews(id: string) {
  await connectToDatabase();
  await NewsCollection.findByIdAndDelete(id);
  revalidatePath("/admin/create-news");
}

export async function getFeaturedNews(locale: "uz" | "ru") {
  await connectToDatabase();
  const news = await NewsCollection.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .limit(200)
    .populate("category")
    .lean();

  const localizedNews = news.map((item: any) => ({
    id: String(item._id),
    title: item.translations[locale]?.title || "",
    excerpt: item.translations[locale]?.excerpt || "",
    category: item.category?.translations[locale]?.name || "",
    image: item.image,
    createdAt: item.createdAt,
    views: item.views || 0,
  }));

  return JSON.parse(JSON.stringify(localizedNews));
}

export async function getNewsById(id: string, locale: "uz" | "ru") {
  await connectToDatabase();

  const news: any = await NewsCollection.findById(id)
    .populate("category")
    .lean();

  if (!news) return null;

  return {
    id: String(news._id),
    title: news.translations?.[locale]?.title || "",
    excerpt: news.translations?.[locale]?.excerpt || "",
    image: news.image || null,
    category: news.category?.translations?.[locale]?.name || "",
    createdAt: news.createdAt,
    views: news.views || 0,
  };
}

export async function getNewsByCategorySlug(slug: string, locale: "uz" | "ru") {
  await connectToDatabase();

  // 1. Slug bo‘yicha kategoriyani topamiz
  const category = (await CategoryCollection.findOne({ slug }).lean()) as any;
  if (!category) return [];

  // 2. Shu kategoriya ID bo‘yicha yangiliklarni topamiz
  const newsList = await NewsCollection.find({
    category: category._id,
    isPublished: true,
  })
    .sort({ createdAt: -1 })
    .lean();

  // 3. Lokalizatsiya bilan qaytaramiz
  return newsList.map((item: any) => ({
    id: String(item._id),
    title: item.translations?.[locale]?.title || "",
    excerpt: item.translations?.[locale]?.excerpt || "",
    image: item.image,
    category: category.translations?.[locale]?.name || "",
    createdAt: item.createdAt,
  }));
}
export async function incrementNewsViews(id: string) {
  await connectToDatabase();

  const news = (await NewsCollection.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } }, // views ni 1 taga oshiramiz
    { new: true }
  ).lean()) as any;

  return news ? news.views : 0;
}
