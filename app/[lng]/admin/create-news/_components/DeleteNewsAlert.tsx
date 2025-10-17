"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { deleteNews } from "@/actions/news.actions";
import { toast } from "sonner";

export function DeleteNewsAlert({ open, setOpen, id }: any) {
  const handleDelete = async () => {
    try {
      await deleteNews(id);
      toast.success("🗑 Yangilik o‘chirildi!");
      setOpen(false);
    } catch (err) {
      toast.error("Xatolik yuz berdi!");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>O‘chirishni tasdiqlaysizmi?</AlertDialogTitle>
          <AlertDialogDescription>
            Ushbu yangilikni o‘chirishni xohlaysizmi? Bu amalni qaytarib
            bo‘lmaydi.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            O‘chirish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
