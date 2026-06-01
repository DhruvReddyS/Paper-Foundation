import { Download } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export type ResourceData = {
  _id: string;
  title: string;
  type: string;
  org: string;
  year?: number;
  fileUrl: string;
  fileSize?: string;
  summary: string;
  tags?: string[];
};

const typeLabel: Record<string, string> = {
  report: "Report",
  guide: "Guide",
  infographic: "Infographic",
  dataset: "Dataset",
  policy: "Policy",
};

export function ResourceCard({ r }: { r: ResourceData }) {
  return (
    <a
      href={r.fileUrl}
      target="_blank"
      rel="noreferrer"
      className="group lift block rounded-card border border-rule bg-paper shadow-card hover:shadow-card-hover p-6 md:p-7 h-full"
    >
      <div className="flex items-center justify-between mb-5">
        <Badge tone="outline">{typeLabel[r.type] || r.type}</Badge>
        {r.year && <span className="text-[12px] text-ink-2 uppercase tracking-[0.14em]">{r.year}</span>}
      </div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-sage mb-2">{r.org}</p>
      <h3 className="font-serif text-[1.2rem] leading-snug text-forest-deep group-hover:text-forest transition-colors">
        {r.title}
      </h3>
      <p className="mt-3 text-[14px] text-ink/75 leading-relaxed line-clamp-3">{r.summary}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-[13px] text-forest inline-flex items-center gap-2">
          Open document <Download size={14} />
        </span>
        {r.fileSize && <span className="text-[11px] text-ink-2">{r.fileSize}</span>}
      </div>
    </a>
  );
}
