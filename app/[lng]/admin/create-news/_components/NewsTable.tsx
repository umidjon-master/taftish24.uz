"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { EditNewsModal } from "./EditNewsModal";
import { DeleteNewsAlert } from "./DeleteNewsAlert";

export function NewsTable({
  news,
  categories,
}: {
  news: any[];
  categories: any[];
}) {
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          📋 Yangiliklar ro‘yxati
        </h2>
        <span className="text-sm text-gray-500">{news.length} ta yangilik</span>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sarlavha (UZ)</TableHead>
            <TableHead>Kategoriya</TableHead>
            <TableHead>Ko&apos;rishlar soni</TableHead>
            <TableHead>Holat</TableHead>
            <TableHead className="text-right">Amallar</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {news.length > 0 ? (
            news.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.translations.uz.title}</TableCell>

                <TableCell>
                  <Badge variant="secondary">
                    {item.category?.translations?.uz?.name || "—"}
                  </Badge>
                </TableCell>
                <TableCell>{item.views}</TableCell>

                <TableCell>
                  {item.isPublished ? (
                    <Badge className="bg-green-100 text-green-700">
                      Nashrda
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-600">Draft</Badge>
                  )}
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedNews(item);
                          setEditOpen(true);
                        }}
                      >
                        ✏️ Tahrirlash
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedNews(item);
                          setDeleteOpen(true);
                        }}
                      >
                        🗑 O‘chirish
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-400 py-6">
                Hech qanday yangilik topilmadi
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableCaption>📰 Oxirgi yangiliklar ro‘yxati</TableCaption>
      </Table>

      {/* ✏️ Edit Modal */}
      {selectedNews && (
        <EditNewsModal
          open={editOpen}
          setOpen={setEditOpen}
          news={selectedNews}
          categories={categories}
        />
      )}

      {/* 🗑 Delete Alert */}
      {selectedNews && (
        <DeleteNewsAlert
          open={deleteOpen}
          setOpen={setDeleteOpen}
          id={selectedNews._id}
        />
      )}
    </div>
  );
}
