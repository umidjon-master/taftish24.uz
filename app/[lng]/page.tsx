import Main from "@/components/bannner/Main";
import Footer from "@/components/shared/footer";
import FeaturedNews from "@/components/card/Featured-News";
import Navbar from "@/components/shared/navbar";
import LatestNews from "@/components/card/Latest-News";
import { setRequestLocale } from "next-intl/server";
import { getFeaturedNews } from "@/actions/news.actions";

type Props = {
  params: Promise<{ lng: "uz" | "ru" }>; // ✅ bu joyda Promise
};

export default async function Index({ params }: Props) {
  const { lng } = await params; // ✅ endi to‘g‘ri
  setRequestLocale(lng);

  const newsList = await getFeaturedNews(lng);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Main />
      <FeaturedNews newsList={newsList} />
      <LatestNews newsList={newsList} />
      <Footer />
    </div>
  );
}
