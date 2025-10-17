// app/api/news/views/[id]/route.ts
import { NextResponse } from "next/server";
import { incrementNewsViews } from "@/actions/news.actions";

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params; // ✅ params'ni kutib olayapmiz

  try {
    const newViews = await incrementNewsViews(id);
    return NextResponse.json({ success: true, views: newViews });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
