"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCategory } from "@/actions/category-news.actions";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
type FormValues = {
  uzName: string;
  ruName: string;
  slug: string;
};

export default function CategoryForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      await createCategory(data);
      router.refresh();
      toast.success("✅ Kategoriya muvaffaqiyatli qo‘shildi!");
      reset();
    } catch (err: any) {
      toast.error(err.message || "❌ Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border rounded-xl p-6 shadow-sm w-full max-w-md space-y-4"
    >
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        🗂 Yangi kategoriya
      </h2>

      <div className="space-y-2">
        <label className="text-sm font-medium">Kategoriya nomi (UZ)</label>
        <Input
          placeholder="Masalan: Biznes"
          {...register("uzName")}
          disabled={loading}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Kategoriya nomi (RU)</label>
        <Input
          placeholder="Например: Бизнес"
          {...register("ruName")}
          disabled={loading}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Slug</label>
        <Input
          placeholder="biznes"
          {...register("slug")}
          disabled={loading}
          required
        />
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
            Qo‘shish
          </>
        )}
      </Button>
    </form>
  );
}
