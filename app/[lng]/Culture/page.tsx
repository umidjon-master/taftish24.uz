import { getNewsByCategorySlug } from "@/actions/news.actions";
import NewsCard from "@/components/card/NewsCard";
import Navbar from "@/components/shared/navbar";
import React from "react";

const Culture = async ({ params }: any) => {
  const { lng } = await params;
  const newsList = await getNewsByCategorySlug("madaniyat", lng);
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {" "}
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
                  news.createdAt
                    ? new Date(news.createdAt).toLocaleString()
                    : ""
                }
              />
            ))}{" "}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">
            Yangiliklar topilmadi.
          </p>
        )}
      </div>
    </div>
  );
};

export default Culture;
