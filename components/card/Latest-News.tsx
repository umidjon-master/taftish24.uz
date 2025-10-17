"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import React from "react";
import NewsCard from "./NewsCard";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  category?: string;
  image?: string | null;
  createdAt?: string | Date;
  time?: string;
};

const LatestNews = ({ newsList }: { newsList: NewsItem[] }) => {
  const latestSection = useScrollAnimation();
  return (
    <section ref={latestSection.ref} className="container mx-auto px-4 pb-20">
      {/* Sarlavha */}
      <div
        className={`mb-16 transition-all duration-1000 ${
          latestSection.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text ">
          So‘nggi yangiliklar
        </h2>
        <div
          className="h-1.5 w-28 rounded-full animate-scale-in"
          style={{ background: "var(--gradient-accent)" }}
        />
      </div>

      {/* Yangiliklar ro‘yxati */}
      {newsList?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {" "}
          {newsList.map((news) => (
            <NewsCard
              key={news.id}
              {...news}
              image={news.image ?? ""}
              category={news.category ?? ""}
              time={
                news.time ||
                (news.createdAt
                  ? new Date(news.createdAt).toLocaleString()
                  : "")
              }
            />
          ))}{" "}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">
          Yangiliklar topilmadi.
        </p>
      )}
    </section>
  );
};

export default LatestNews;
