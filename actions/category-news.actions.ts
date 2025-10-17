"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongoose";
import CategoryCollection from "@/models/Category";
import slugify from "slugify";

export async function createCategory(data: any) {
  await connectToDatabase();

  let baseSlug = slugify(data.slug || data.uzName, {
    lower: true,
    strict: true,
  });
  let slug = baseSlug;
  let counter = 1;

  while (await CategoryCollection.findOne({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const category = await CategoryCollection.create({
    translations: {
      uz: { name: data.uzName },
      ru: { name: data.ruName },
    },
    slug,
  });

  // ✅ faqat oddiy JSON qaytaramiz
  return JSON.parse(JSON.stringify(category));
  revalidatePath("/admin/category");
}

export async function updateCategory(id: string, data: any) {
  await connectToDatabase();
  await CategoryCollection.findByIdAndUpdate(id, {
    translations: {
      uz: { name: data.uzName },
      ru: { name: data.ruName },
    },
    slug: data.slug.toLowerCase(),
  });

  revalidatePath("/admin/category");
}

export async function deleteCategory(id: string) {
  await connectToDatabase();
  await CategoryCollection.findByIdAndDelete(id);
  revalidatePath("/admin/category");
}
