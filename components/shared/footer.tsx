"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <footer className="relative bg-secondary text-secondary-foreground py-20 mt-20 overflow-hidden">
      {/* 📍 Fon naqshi */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* 📰 Sayt haqida */}
          <div className="space-y-4">
            <h3 className="text-3xl font-black bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Taftish24.uz
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              “TAFTISH24.UZ” — moliyaviy, ma’rifiy, huquqiy va axborot
              yo‘nalishidagi onlayn portal. Mustaqil axborot manbasi sifatida
              ijtimoiy hayot, qonunchilik va iqtisodiy sohalarga oid ishonchli
              yangiliklarni yoritadi.
            </p>

            <div className="flex gap-4 pt-2">
              {[
                { icon: "mdi:facebook", href: "#" },
                { icon: "mdi:instagram", href: "#" },
                { icon: "mdi:twitter", href: "#" },
                { icon: "mdi:youtube", href: "#" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <Icon
                    icon={item.icon}
                    className="w-6 h-6 text-primary group-hover:text-white"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* ⚡ Tez havolalar */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-foreground">Tez havolalar</h4>
            <ul className="space-y-3">
              {[
                { name: "Bosh sahifa", href: "/" },
                { name: "Texnologiya", href: "/uz/technology" },
                { name: "Biznes", href: "/uz/business" },
                { name: "Sport", href: "/uz/sport" },
                { name: "Dunyo", href: "/uz/mir" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 📞 Aloqa ma’lumotlari */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-foreground">Aloqa</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Icon
                  icon="mdi:phone"
                  className="w-5 h-5 text-primary mt-0.5"
                />
                <span>+998 91 393 96 06</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon
                  icon="mdi:email"
                  className="w-5 h-5 text-primary mt-0.5"
                />
                <span>info@taftish24.uz</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon
                  icon="mdi:map-marker"
                  className="w-5 h-5 text-primary mt-0.5"
                />
                <span>
                  Buxoro viloyati, Jondor tumani,
                  <br /> G‘uba qishlog‘i, 91-uy
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 🔻 Pastki qator */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 Taftish24.uz. Barcha huquqlar himoyalangan.</p>
            <div className="flex gap-6">
              {[
                { name: "Foydalanish shartlari", href: "#" },
                { name: "Maxfiylik siyosati", href: "#" },
                { name: "Biz haqimizda", href: "#" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
