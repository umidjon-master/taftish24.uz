import { connectToDatabase } from "@/lib/mongoose";
import NewsCollection from "@/models/News";
import CategoryCollection from "@/models/Category";
import { CreateNewsForm } from "./_components/CreateNewsForm";
import { NewsTable } from "./_components/NewsTable";

export default async function NewsPage() {
  await connectToDatabase();
  const categoriesData = await CategoryCollection.find().lean();
  const newsData = await NewsCollection.find()
    .populate("category")
    .sort({ createdAt: -1 })
    .lean();

  const categories = JSON.parse(JSON.stringify(categoriesData));
  const news = JSON.parse(JSON.stringify(newsData));

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CreateNewsForm categories={categories} />

        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-full max-w-md bg-gradient-to-br from-blue-50 to-white border rounded-2xl p-6 shadow-inner text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              📰 News Management
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Yangi yangiliklar yarating, tahrirlang va ularni kategoriyalar
              orqali boshqaring.
            </p>
          </div>
        </div>
      </div>

      <NewsTable news={news} categories={categories} />
    </div>
  );
}
