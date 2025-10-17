"use client";

import { signOut } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function DashboardClient({ stats }: { stats: any }) {
  return (
    <div className="mx-2 mb-2 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-gray-600">Xush kelibsiz, </p>
        </div>

        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          variant="destructive"
          className="mt-3 sm:mt-0 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Chiqish
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-all border-blue-200">
          <CardHeader>
            <CardTitle>Yangiliklar soni</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.newsCount}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all border-green-200">
          <CardHeader>
            <CardTitle>Kategoriyalar soni</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.categoryCount}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all border-purple-200">
          <CardHeader>
            <CardTitle>Ko‘rishlar soni</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalViews}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
