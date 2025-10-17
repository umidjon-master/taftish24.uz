"use client";

import { useEffect, useState, useRef } from "react";

export default function ViewsCounter({
  id,
  initialViews,
}: {
  id: string;
  initialViews: number;
}) {
  const [views, setViews] = useState<number>(initialViews);
  const hasIncremented = useRef(false); // 🔹 faqat bir marta ishlashi uchun flag

  useEffect(() => {
    if (hasIncremented.current) return; // agar oldin bajarilgan bo‘lsa, qaytamiz
    hasIncremented.current = true;

    const viewedNews = JSON.parse(localStorage.getItem("viewedNews") || "[]");

    // 🔹 Agar foydalanuvchi ilgari ko‘rgan bo‘lsa, serverga yubormaymiz
    if (viewedNews.includes(id)) {
      return;
    }

    const incrementViews = async () => {
      try {
        const res = await fetch(`/api/news/views/${id}`, { method: "POST" });
        const data = await res.json();

        if (data?.views !== undefined) {
          setViews(data.views);
          localStorage.setItem(
            "viewedNews",
            JSON.stringify([...viewedNews, id])
          );
        }
      } catch (err) {
        console.error("View increment error:", err);
      }
    };

    incrementViews();
  }, [id]);

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      👁 <span>{views}</span> <span>marta ko‘rilgan</span>
    </div>
  );
}
