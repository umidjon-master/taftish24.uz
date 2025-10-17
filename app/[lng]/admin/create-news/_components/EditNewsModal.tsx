"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateNews } from "@/actions/news.actions";

export function EditNewsModal({ open, setOpen, news }: any) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      uzTitle: news.translations.uz.title,
      ruTitle: news.translations.ru.title,
      uzExcerpt: news.translations.uz.excerpt,
      ruExcerpt: news.translations.ru.excerpt,
      image: news.image,
    },
  });

  const [preview, setPreview] = useState(news.image || "");

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setValue("image", base64);
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: any) => {
    try {
      await updateNews(news._id, data);
      toast.success("✅ Yangilik yangilandi!");
      setOpen(false);
    } catch (err) {
      toast.error("❌ Xatolik yuz berdi!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>✏️ Yangilikni tahrirlash</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="text-sm font-medium">Sarlavha (UZ)</label>
          <Input {...register("uzTitle")} />

          <label className="text-sm font-medium">Qisqacha (UZ)</label>
          <Textarea {...register("uzExcerpt")} />

          <label className="text-sm font-medium">Заголовок (RU)</label>
          <Input {...register("ruTitle")} />

          <label className="text-sm font-medium">Кратко (RU)</label>
          <Textarea {...register("ruExcerpt")} />

          <label className="text-sm font-medium">Rasmni yangilash</label>
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

          <Button type="submit" className="w-full bg-blue-600 text-white">
            Saqlash
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
