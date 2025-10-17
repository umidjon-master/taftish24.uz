"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { createNews } from "@/actions/news.actions";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

type FormValues = {
  uzTitle: string;
  ruTitle: string;
  uzExcerpt: string;
  ruExcerpt: string;
  image: string;
  categoryId: string;
  isPublished: boolean;
};

export function CreateNewsForm({ categories }: { categories: any[] }) {
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // base64'ga o‘girish funksiyasi
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setValue("image", base64);
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      await createNews(data);
      toast.success("📰 Yangilik muvaffaqiyatli qo‘shildi!");
      reset();
      setPreview(null);
    } catch (err) {
      toast.error("❌ Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border rounded-xl p-6 shadow-sm space-y-5 max-w-2xl"
    >
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
        🗞 Yangi yangilik
      </h2>

      {/* Uzbekcha */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Sarlavha (UZ)</label>
        <Input
          placeholder="Masalan: Yangi iqtisodiy o‘zgarishlar"
          {...register("uzTitle")}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Qisqacha (UZ)</label>
        <Textarea
          placeholder="Yangilik haqida qisqacha..."
          {...register("uzExcerpt")}
          required
        />
      </div>

      {/* Ruscha */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Заголовок (RU)</label>
        <Input
          placeholder="Например: Новые экономические изменения"
          {...register("ruTitle")}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Кратко (RU)</label>
        <Textarea
          placeholder="Краткое описание..."
          {...register("ruExcerpt")}
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Kategoriya</label>
        <Select onValueChange={(value) => setValue("categoryId", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Kategoriya tanlang" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.translations.uz.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rasm yuklash */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Rasm yuklash</label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg border mt-2"
          />
        )}
      </div>

      {/* Published */}
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("isPublished")} />
        <label className="text-sm font-medium">Nashr etilsin</label>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Icon icon="eos-icons:loading" className="animate-spin text-lg" />
            Saqlanmoqda...
          </>
        ) : (
          <>
            <Icon icon="mdi:plus-circle-outline" className="text-lg" />
            Yangilik qo‘shish
          </>
        )}
      </Button>
    </form>
  );
}
