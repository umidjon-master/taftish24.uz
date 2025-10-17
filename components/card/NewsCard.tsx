"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  time: string;
  featured?: boolean;
}

const NewsCard = ({
  id,
  title,
  excerpt,
  category,
  image,
  time,
  featured = false,
}: NewsCardProps) => {
  const router = useRouter();
  const handleRouter = () => {
    router.push(`/news/${id}`);
  };
  return (
    <Card
      className={`group border cursor-pointer relative p-0 overflow-hidden  bg-card transition-all duration-500 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-2 animate-fade-in-up ${
        featured ? "col-span-full md:col-span-2" : ""
      }`}
      style={{ boxShadow: "var(--shadow-card)" }}
      onClick={() => handleRouter()}
    >
      <div className={`relative overflow-hidden ${featured ? "h-80" : "h-48"}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ background: "var(--gradient-overlay)" }}
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge
            className="bg-accent  text-white hover:bg-accent/90 transition-all duration-300 group-hover:scale-110 backdrop-blur-sm"
            style={{ background: "var(--gradient-accent)" }}
          >
            {category}
          </Badge>
          <div className="bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full transition-all duration-300 group-hover:bg-background/90">
            <div className="flex items-center text-xs font-medium ">
              <Clock className="w-3 h-3 mr-1.5" />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-b from-card to-card/95">
        <h3
          className={`font-bold mb-3 text-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 ${
            featured ? "text-2xl leading-tight" : "text-xl"
          }`}
        >
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2 transition-colors duration-300 group-hover:text-foreground/80">
          {excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 ">
          <span className="text-sm font-semibold text-primary transition-all duration-300 group-hover:translate-x-2">
            Batafsil o'qish →
          </span>
        </div>
      </div>
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: "inset 0 0 60px -20px hsl(var(--primary) / 0.2)",
        }}
      />
    </Card>
  );
};

export default NewsCard;
