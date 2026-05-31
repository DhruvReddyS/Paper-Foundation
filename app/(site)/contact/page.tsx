import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { foundation } from "@/lib/foundation";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to Paper Foundation — partnerships, press, corrections, and questions.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  return (
    <>
      <section className="paper-grain border-b border-rule">
        <div className="container pt-16 pb-12 md:pt-24 md:pb-16 max-w-3xl">
          <p className="text-caption uppercase tracking-[0.18em] text-sage mb-4">Contact</p>
          <h1 className="font-serif text-h1 md:text-display text-forest-deep leading-[1.05] tracking-tight">
            Write to us.
          </h1>
          <p className="mt-6 text-body-lg text-ink/80 leading-relaxed">
            Partnerships, press queries, corrections, story tips, volunteer applications — all
            land in the same inbox and are read within a few working days.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container max-w-5xl grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
          <ContactForm defaultType={type} />

          <aside className="space-y-7 lg:sticky lg:top-28">
            <div className="rounded-card border border-rule bg-paper p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="w-10 h-10 rounded-card bg-paper-2 grid place-items-center text-forest shrink-0">
                  <MapPin size={17} />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-ink-2 mb-1">
                    Registered office
                  </p>
                  <p className="font-serif text-[1.05rem] text-forest-deep leading-snug">
                    {foundation.legalName}
                  </p>
                </div>
              </div>
              <address className="not-italic text-[14px] leading-relaxed text-ink/80">
                {foundation.address.line1}<br />
                {foundation.address.line2}<br />
                {foundation.address.city} — {foundation.address.state}<br />
                {foundation.address.country}
              </address>
              <p className="mt-4 pt-4 border-t border-rule text-[12px] text-ink-2">
                Reg. No. {foundation.registration.number} ·{" "}
                {foundation.registration.act}.
              </p>
            </div>

            <div className="rounded-card border border-rule bg-paper p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="w-10 h-10 rounded-card bg-paper-2 grid place-items-center text-forest shrink-0">
                  <Mail size={17} />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-ink-2 mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${foundation.contactEmail}`}
                    className="font-serif text-[1.05rem] text-forest hover:underline"
                  >
                    {foundation.contactEmail}
                  </a>
                </div>
              </div>
              <p className="text-[13px] text-ink-2 leading-relaxed">
                For corrections, please mention the article slug or URL in your subject line.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
