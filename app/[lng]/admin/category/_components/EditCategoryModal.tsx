"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { updateCategory } from "@/actions/category-news.actions";

type Props = { id: string; uzName: string; ruName: string; slug: string };

export function EditCategoryModal({ id, uzName, ruName, slug }: Props) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { uzName, ruName, slug },
  });

  const onSubmit = async (data: any) => {
    await updateCategory(id, data);
    toast.success("Kategoriya yangilandi!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Tahrirlash
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Kategoriyani tahrirlash</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input {...register("uzName")} placeholder="UZ nomi" required />
          <Input {...register("ruName")} placeholder="RU nomi" required />
          <Input {...register("slug")} placeholder="slug" required />
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Saqlash
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
