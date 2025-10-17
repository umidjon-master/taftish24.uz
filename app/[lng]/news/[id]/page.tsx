// app/[lng]/news/[id]/page.tsx
import { getNewsById } from "@/actions/news.actions";
import Navbar from "@/components/shared/navbar";
import Image from "next/image";
import ViewsCounter from "./views-counter";
import { Metadata } from "next";

interface Props {
  params: Promise<{ lng: "uz" | "ru"; id: string }>;
}

// ✅ SEO metadata generatsiya qilish
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lng, id } = await params;
  const news = await getNewsById(id, lng);

  if (!news) {
    return {
      title: lng === "uz" ? "Yangilik topilmadi" : "Новость не найдена",
      description:
        lng === "uz"
          ? "Siz izlagan yangilik topilmadi."
          : "Новость, которую вы ищете, не найдена.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://taftish24.uz";
  const url = `${siteUrl}/${lng}/news/${id}`;
  const imageUrl = news.image || `${siteUrl}/fallback-news.jpg`;

  return {
    title: `${news.title} | ${
      lng === "uz" ? "So‘nggi yangiliklar" : "Последние новости"
    }`,
    description: news.excerpt.slice(0, 160) + "...",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: news.title,
      description: news.excerpt,
      url,
      siteName: "News Portal",
      locale: lng === "uz" ? "uz_UZ" : "ru_RU",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.excerpt,
      images: [imageUrl],
    },
  };
}

// 👇 Server component
export default async function NewsDetails({ params }: Props) {
  const { lng, id } = await params;
  const news = await getNewsById(id, lng);

  if (!news) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold text-red-600">
          Yangilik topilmadi 😕
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="container mx-auto px-4 md:px-8 py-10 md:py-16 max-w-5xl">
        {/* 🖼 Rasm */}
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-lg mb-8 md:mb-12">
          <Image
            src={news.image || "/fallback-news.jpg"}
            alt={news.title}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 md:left-6">
            <span className="bg-accent/90 text-white px-3 py-1.5 md:px-4 md:py-1 rounded-full text-xs md:text-sm font-semibold shadow-md">
              {news.category}
            </span>
          </div>
        </div>

        {/* 📰 Sarlavha */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 leading-snug bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
          {news.title}
        </h1>

        {/* 📅 Meta ma’lumotlar */}
        <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-muted-foreground mb-6">
          <span>
            🗓{" "}
            {new Date(news.createdAt).toLocaleDateString(
              lng === "uz" ? "uz-UZ" : "ru-RU",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </span>
          <span>📁 {news.category || "Kategoriya"}</span>
        </div>

        {/* 👁 Views */}
        <ViewsCounter id={id} initialViews={news.views || 0} />

        {/* 📄 Matn */}
        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-foreground/90 whitespace-pre-line mt-4">
          {news.excerpt}
        </p>
      </article>
    </div>
  );
}
