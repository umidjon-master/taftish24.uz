"use client";

import { useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useTranslation } from "@/i18n/client";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getFeaturedNews } from "@/actions/news.actions";

export default function Navbar() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = (params?.lng as "uz" | "ru") || "uz";

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsList, setNewsList] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const { t, i18n } = useTranslation(currentLang);

  useEffect(() => {
    if (i18n.language !== currentLang) i18n.changeLanguage(currentLang);
    getFeaturedNews(currentLang).then(setNewsList);
  }, [currentLang, i18n]);

  useEffect(() => {
    if (searchQuery.trim() === "") setFiltered([]);
    else {
      const q = searchQuery.toLowerCase();
      setFiltered(
        newsList.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.excerpt.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery, newsList]);

  const handleLangChange = (value: "uz" | "ru") => {
    const newPath = pathname.replace(`/${currentLang}`, `/${value}`);
    router.push(newPath);
  };

  const categories = t("navbar.categories", {
    returnObjects: true,
  }) as string[];

  const slugMap: Record<string, string> = {
    Dunyo: "mir",
    Texnologiya: "technology",
    Biznes: "business",
    Sport: "sport",
    Madaniyat: "Culture",
    Fan: "subject",
    Мир: "mir",
    Технологии: "technology",
    Бизнес: "business",
    Спорт: "sport",
    Культура: "Culture",
    Наука: "subject",
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-10">
              <Link
                href={`/${currentLang}`}
                className="text-3xl font-extrabold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text animate-fade-in"
              >
                {t("navbar.logo")}
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex gap-1">
                {categories.map((category, index) => {
                  const slug = slugMap[category];
                  return (
                    <Link
                      key={category}
                      href={`/${currentLang}/${slug}`}
                      className="relative px-4 py-2 text-sm font-semibold text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-105 rounded-lg hover:bg-muted/50 group"
                    >
                      {category}
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-3/4 rounded-full" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              {/* Til tanlash */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  >
                    {currentLang === "uz" ? (
                      <Icon
                        icon="emojione-v1:flag-for-uzbekistan"
                        className="w-6 h-6"
                      />
                    ) : (
                      <Icon
                        icon="emojione-v1:flag-for-russia"
                        className="w-6 h-6"
                      />
                    )}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleLangChange("uz")}>
                    🇺🇿 {t("navbar.uzbek")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLangChange("ru")}>
                    🇷🇺 {t("navbar.russian")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Qidiruv */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Mobil menyu */}
              {/* Mobil menyu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-80 p-0 overflow-hidden border-none"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary/80 via-primary-glow to-accent text-white py-6 px-5 shadow-md flex items-center justify-between">
                    <h2 className="text-2xl font-extrabold tracking-tight">
                      {t("navbar.logo")}
                    </h2>
                  </div>

                  {/* Kontent */}
                  <div className="px-6 py-6 bg-background/95 h-full backdrop-blur-md">
                    <div className="flex flex-col gap-4">
                      {categories.map((category) => {
                        const slug = slugMap[category];
                        return (
                          <Link
                            key={category}
                            href={`/${currentLang}/${slug}`}
                            className="flex justify-between items-center gap-3 px-3 py-2 text-lg font-medium rounded-lg hover:bg-muted/60 transition-all group"
                          >
                            <span className="text-foreground group-hover:text-primary font-semibold">
                              {category}
                            </span>
                            <span className="text-primary group-hover:translate-x-1 transition-transform duration-200">
                              <Icon
                                icon="mdi:chevron-right"
                                className="w-4 h-4"
                              />
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Ajratkich */}
                    <div className="h-px bg-muted my-6" />

                    {/* Qo‘shimcha qismlar */}
                    <div className="flex flex-col gap-3">
                      <Button
                        onClick={() => setSearchOpen(true)}
                        variant="outline"
                        className="w-full flex items-center gap-2 text-primary hover:text-primary/90 border-primary/30 hover:border-primary/60"
                      >
                        <Search className="w-4 h-4" /> {t("navbar.searchTitle")}
                      </Button>

                      <div className="flex gap-2 justify-center mt-3">
                        <Button
                          variant="ghost"
                          onClick={() => handleLangChange("uz")}
                          className={`flex-1 border rounded-full ${
                            currentLang === "uz"
                              ? "bg-primary text-white"
                              : "border-muted-foreground"
                          }`}
                        >
                          🇺🇿 UZ
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleLangChange("ru")}
                          className={`flex-1 border rounded-full ${
                            currentLang === "ru"
                              ? "bg-primary text-white"
                              : "border-muted-foreground"
                          }`}
                        >
                          🇷🇺 RU
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* 🔍 Qidiruv modal */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>🔍 {t("navbar.searchTitle")}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("navbar.searchPlaceholder")}
              className="flex-1"
            />

            {/* Natijalar */}
            {filtered.length > 0 && (
              <div className="bg-muted/30 rounded-lg max-h-[300px] overflow-y-auto border border-muted mt-2">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSearchOpen(false);
                      router.push(`/${currentLang}/news/${item.id}`);
                    }}
                    className="p-3 hover:bg-muted cursor-pointer transition-all"
                  >
                    <h4 className="font-semibold text-sm md:text-base">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {item.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
