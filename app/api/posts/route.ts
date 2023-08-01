import { NextResponse } from "next/server";
import { getAllArticles } from "@/utils/getArticles";

export async function GET() {
  const articles = await getAllArticles();
  const slugs = articles.map((article) => article.slug);
  return NextResponse.json({ slugs });
}
