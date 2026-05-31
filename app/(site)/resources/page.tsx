import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Download } from "lucide-react";
import { connectDB } from "@/lib/db";
import { ResourceModel } from "@/lib/models";
import { ResourcesList } from "@/components/site/ResourcesList";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Resources",
  description: "Curated, public-domain reports and reading on paper, recycling and circularity.",
};

async function getResources() {
  try {
    await connectDB();
    const docs = await ResourceModel.find({ status: "published" })
      .sort({ year: -1, createdAt: -1 })
      .lean();
    return docs.map((d) => ({
      _id: String(d._id),
      title: d.title,
      type: d.type,
      org: d.org,
      year: d.year || undefined,
      fileUrl: d.fileUrl,
      fileSize: d.fileSize,
      summary: d.summary,
      tags: d.tags,
    }));
  } catch {
    return [];
  }
}

const ownDocs = [
  {
    title: "Bylaws of Paper Foundation",
    note: "Governing document of the society — composition, objects, meetings, finances.",
    href: "/docs/paper-foundation-bylaws.pdf",
    type: "Bylaws",
  },
  {
    title: "Membership Application",
    note: "Apply to become a member of Paper Foundation.",
    href: "/docs/membership-application.pdf",
    type: "Application",
  },
  {
    title: "Notice — First Meeting of Paper Foundation",
    note: "Notice and agenda issued for the foundation's first general meeting.",
    href: "/docs/first-meeting-notice.pdf",
    type: "Notice",
  },
];

export default async function ResourcesPage() {
  const resources = await getResources();
  return (
    <>
      <section className="relative overflow-hidden paper-grain border-b border-rule">
        <div
          className="container relative z-10"
          style={{ padding: "clamp(110px, 14vw, 160px) 0 clamp(60px, 8vw, 90px)" }}
        >
          <div className="flex items-center gap-4 mb-9 flex-wrap">
            <span className="j-pill">REFERENCE · LIBRARY</span>
            <span style={{ width: 64, height: 1, background: "var(--rule)" }} />
            <span className="j-mono">
              {String(resources.length + ownDocs.length).padStart(2, "0")} ENTRIES · CURATED
            </span>
          </div>
          <h1
            className="font-serif text-forest-deep"
            style={{
              fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Documents we publish.<br />
            <em style={{ color: "var(--forest)" }}>Reports we read.</em>
          </h1>
          <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-20 items-end">
            <p className="text-body-lg leading-relaxed max-w-3xl text-ink">
              Our own governance documents and membership form, alongside a
              curated library of publicly available reports, datasets, and
              policy documents that inform our work. Every entry links to its
              original source — we don&apos;t re-host material unless
              permitted.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {[
                ["Public", "Domain only"],
                ["Linked", "To the original"],
                ["Dated", "Year of access"],
                ["Open", "No paywalls"],
              ].map(([v, l]) => (
                <div key={l} className="pt-3 border-t border-rule">
                  <div
                    className="font-serif text-forest"
                    style={{ fontSize: 22, lineHeight: 1.1 }}
                  >
                    {v}
                  </div>
                  <div className="j-mono mt-1.5">{l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container max-w-6xl">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-7">
            <h2 className="font-serif text-h2 text-forest-deep">From Paper Foundation</h2>
            <Link href="/about#registration" className="text-[13px] editorial-link text-forest">
              See our registration →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ownDocs.map((d) => (
              <a
                key={d.href}
                href={d.href}
                target="_blank"
                rel="noreferrer"
                className="group lift block rounded-card border border-rule bg-paper shadow-card hover:shadow-card-hover p-6 md:p-7 h-full"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[12px] font-medium tracking-[0.02em] bg-copper text-paper">
                    {d.type}
                  </span>
                  <FileText size={16} className="text-ink-2" />
                </div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-sage mb-2">
                  Paper Foundation
                </p>
                <h3 className="font-serif text-[1.2rem] leading-snug text-forest-deep group-hover:text-forest transition-colors">
                  {d.title}
                </h3>
                <p className="mt-3 text-[14px] text-ink/75 leading-relaxed">{d.note}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[13px] text-forest">
                  Open document <Download size={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-rule">
        <div className="container max-w-6xl pt-12">
          <h2 className="font-serif text-h2 text-forest-deep mb-2">External library</h2>
          <p className="text-ink-2 max-w-2xl">
            Public-domain reports, datasets and policy documents we draw on in our research.
          </p>
        </div>
      </div>
      <ResourcesList resources={resources} />
    </>
  );
}
