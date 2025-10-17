import { getDashboardStats } from "@/actions/dashboard.actions";
import DashboardClient from "./_components/DashboardClient";
import CategoryTable from "../category/_components/category-table";
import CategoryCollection from "@/models/Category";
import { connectToDatabase } from "@/lib/mongoose";
import { NewsTable } from "../create-news/_components/NewsTable";
import NewsCollection from "@/models/News";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  await connectToDatabase();
  const newsData = await NewsCollection.find()
    .populate("category")
    .sort({ createdAt: -1 })
    .lean();

  const news = JSON.parse(JSON.stringify(newsData));
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
    <>
      <DashboardClient stats={stats} />
      <div className="mx-2 flex flex-col gap-2">
        <NewsTable news={news} categories={categories} />
        <CategoryTable categories={categories} />
      </div>
    </>
  );
}
