"use client";

import React from "react";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { useTranslation } from "@/i18n/client";

const Main = () => {
  const params = useParams();
  const currentLang = (params?.lng as "uz" | "ru") || "uz";
  const { t, i18n } = useTranslation(currentLang);

  // til o‘zgarganda i18n tilini yangilash
  React.useEffect(() => {
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang, i18n]);

  return (
    <section className="relative h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-105" />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)", opacity: 0.92 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(var(--accent-glow))_0%,_transparent_50%)] opacity-20" />

      {/* Text content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-4xl animate-fade-in">
          {/* Tag */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 animate-slide-in-right backdrop-blur-xl rounded-full"
            style={{
              background: "var(--gradient-accent)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="text-white font-bold text-sm tracking-wide">
              {t("main.tag")}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
            {t("main.title")}{" "}
            <span className="bg-gradient-to-r from-accent via-accent-glow to-white bg-clip-text text-transparent animate-fade-in-up">
              {t("main.highlight")}
            </span>
          </h1>

          {/* Button */}
          <div className="text-xl text-slate-300 mb-10 font-medium leading-relaxed max-w-2xl">
            {t("main.button")}
          </div>
          <div >

          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Main;
