import React from "react";
import { EditCategoryModal } from "./EditCategoryModal";
import { DeleteDropdown } from "./DeleteDropdown";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CategoryTable = ({ categories }: { categories: any }) => {
  return (
    <div>
      {" "}
      <Card className="shadow-sm border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            📂 Kategoriyalar{" "}
            <Badge variant="outline">{categories.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className=" rounded-md border">
            <Table>
              <TableCaption>Kategoriya ro‘yxati</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30%]">Nomi (UZ)</TableHead>
                  <TableHead className="w-[30%]">Nomi (RU)</TableHead>
                  <TableHead className="w-[20%]">Slug</TableHead>
                  <TableHead className="text-right w-[20%]">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length ? (
                  categories.map((cat: any) => (
                    <TableRow key={cat.id} className="hover:bg-muted/40">
                      <TableCell className="font-medium">
                        {cat.uzName}
                      </TableCell>
                      <TableCell>{cat.ruName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{cat.slug}</Badge>
                      </TableCell>
                      <TableCell className="text-right flex justify-end gap-2">
                        {/* ✅ endi faqat primitiv prop-lar */}
                        <EditCategoryModal
                          id={cat.id}
                          uzName={cat.uzName}
                          ruName={cat.ruName}
                          slug={cat.slug}
                        />
                        <DeleteDropdown id={cat.id} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-6 text-muted-foreground"
                    >
                      Hozircha kategoriya yo‘q 😔
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryTable;
