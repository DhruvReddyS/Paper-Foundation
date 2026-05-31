import { CinematicHero } from "@/components/site/CinematicHero";
import { LifecycleChapters } from "@/components/site/LifecycleChapters";
import { CinematicCredits } from "@/components/site/CinematicCredits";
import { EvidenceMarquee } from "@/components/site/EvidenceMarquee";
import { AssumptionsQuiz } from "@/components/site/AssumptionsQuiz";
import { MythOfDay } from "@/components/site/MythOfDay";
import { FeaturedArticles } from "@/components/site/FeaturedArticles";
import { ManifestoDark } from "@/components/site/ManifestoDark";
import { ImpactCounter } from "@/components/site/ImpactCounter";
import { FactOfWeek } from "@/components/site/FactOfWeek";
import { StatsInterlude } from "@/components/site/StatsInterlude";
import { VoicesMarquee } from "@/components/site/VoicesMarquee";
import { connectDB } from "@/lib/db";
import { ArticleModel } from "@/lib/models";

export const dynamic = "force-dynamic";

async function getFeatured() {
  try {
    await connectDB();
    const docs = await ArticleModel.find({ status: "published" })
      .sort({ featured: -1, publishedAt: -1 })
      .limit(3)
      .lean();
    return docs.map((d) => ({
      slug: d.slug,
      title: d.title,
      excerpt: d.excerpt,
      category: d.category,
      author: d.author,
      publishedAt: d.publishedAt || undefined,
      coverImage: d.coverImage || undefined,
      readingTimeMin: d.readingTimeMin,
      quickRead: d.quickRead,
      references: d.references || [],
    }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featured = await getFeatured();
  return (
    <>
      <CinematicHero />
      <LifecycleChapters />
      <StatsInterlude />
      <EvidenceMarquee />
      <AssumptionsQuiz />
      <MythOfDay />
      {featured.length > 0 && <FeaturedArticles articles={featured} />}
      <VoicesMarquee />
      <ManifestoDark />
      <ImpactCounter />
      <FactOfWeek />
      <CinematicCredits />
    </>
  );
}
