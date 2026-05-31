import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ArticleModel, type Article } from "@/lib/models";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const dynamic = "force-dynamic";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let articles: Article[] = [];
  try {
    await connectDB();
    articles = (await ArticleModel.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .limit(50)
      .lean()) as Article[];
  } catch {}
  const items = articles
    .map(
      (a) => `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${SITE}/knowledge/${a.slug}</link>
      <guid>${SITE}/knowledge/${a.slug}</guid>
      <pubDate>${a.publishedAt ? new Date(a.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
      <description>${escapeXml(a.excerpt)}</description>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Paper Foundation India — Knowledge Hub</title>
    <link>${SITE}/knowledge</link>
    <description>Evidence-based articles on paper, recycling and circularity in India.</description>
    <language>en-IN</language>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
