"use client";

import React from "react";
import NewsCard from "./NewsCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  category?: string;
  image?: string | null; // url yoki base64
  createdAt?: string | Date;
  time?: string;
};

export default function FeaturedNews({ newsList }: { newsList: NewsItem[] }) {
  const featuredSection = useScrollAnimation();

  // serverdan kelgan newsList'dan faqat 3 ta oliamiz
  const list = Array.isArray(newsList) ? newsList.slice(0, 3) : [];
  console.log("FeaturedNews newsList:", list);
  return (
    <section ref={featuredSection.ref} className="container mx-auto px-4 py-20">
      <div
        className={`mb-16 transition-all duration-1000 ${
          featuredSection.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text">
          Tanlangan yangiliklar
        </h2>
        <div
          className="h-1.5 w-28 rounded-full animate-scale-in"
          style={{ background: "var(--gradient-accent)" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {list.length > 0 ? (
          list.map((news, index) => (
            <NewsCard
              id={news.id}
              key={news.id || index}
              title={news.title}
              excerpt={news.excerpt}
              category={news.category || "—"}
              image={news.image || ""} // agar yo'q bo'lsa NewsCard ichida fallback ko'rsatiladi
              time={
                news.time ||
                (news.createdAt
                  ? new Date(news.createdAt).toLocaleString()
                  : "")
              }
              featured={index === 0}
            />
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-gray-500 rounded-lg border border-dashed">
            Hozircha tanlangan yangiliklar mavjud emas.
          </div>
        )}
      </div>
    </section>
  );
}
