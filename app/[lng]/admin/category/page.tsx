import { connectToDatabase } from "@/lib/mongoose";
import CategoryCollection from "@/models/Category";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CategoryForm from "./_components/category-form";
import Image from "next/image";
import CategoryTable from "./_components/category-table";

export default async function CategoriesPage() {
  await connectToDatabase();

  // 🔴 MUAMMO: Mongoose Document yuborish — o‘rniga .lean()
  const docs = await CategoryCollection.find(
    {},
    { "translations.uz.name": 1, "translations.ru.name": 1, slug: 1 }
  )
    .sort({ createdAt: -1 })
    .lean(); // ✅ POJO bo'lib keladi

  // client komponentlarga yuborish uchun primitivlar
  const categories = docs.map((d: any) => ({
    id: d._id.toString(),
    uzName: d.translations.uz.name,
    ruName: d.translations.ru.name,
    slug: d.slug,
  }));

  return (
    <div className="p-6 space-y-8">
      <Card className="shadow-sm border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            🗂 Yangi kategoriya
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6  items-center justify-center">
          <CategoryForm />
          <Image
            src={"/category.svg"}
            alt="News category illustration"
            width={400}
            height={300}
            className="mx-auto mb-4 drop-shadow-sm"
          />
        </CardContent>
      </Card>
      <CategoryTable categories={categories} />
    </div>
  );
}
