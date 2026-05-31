import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Compass, Scale, Eye, Users, FileText, Download } from "lucide-react";
import { foundation } from "@/lib/foundation";
import { Timeline } from "@/components/site/Timeline";

export const metadata: Metadata = {
  title: "About",
  description:
    "Paper Foundation is a registered society advocating evidence-based understanding of paper, recycling and circularity.",
};

const principles = [
  {
    icon: Compass,
    title: "Evidence first",
    body: "Every claim we publish links to its primary source. Where data is contested, we say so plainly and present the range.",
  },
  {
    icon: Scale,
    title: "Balance, not advocacy",
    body: "We don't promote careless paper use, and we don't accept lazy anti-paper rhetoric either. We promote informed use.",
  },
  {
    icon: Eye,
    title: "Transparency",
    body: "Funding, editorial decisions, registration details and corrections are public. Mistakes get a dated correction note — not a quiet edit.",
  },
  {
    icon: Users,
    title: "Public interest",
    body: "Our content is openly licensed (CC BY 4.0). Teachers, journalists, and policymakers can reuse freely with attribution.",
  },
];

const gallery = [
  {
    src: "/photos/think-planet-think-print.jpg",
    alt: "Think Planet, Think Print — public-awareness campaign poster",
    caption: "Think Planet · Think Print",
  },
  {
    src: "/photos/poster-malayalam-1.jpg",
    alt: "Malayalam-language infographic on printing and nature",
    caption: "Public-awareness infographic (Malayalam)",
  },
  {
    src: "/photos/poster-framed-1.jpg",
    alt: "Framed poster from the foundation's outreach work",
    caption: "Outreach poster — framed",
  },
  {
    src: "/photos/poster-framed-2.jpg",
    alt: "Framed campaign poster",
    caption: "Campaign material on display",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="paper-grain border-b border-rule">
        <div className="container pt-16 pb-12 md:pt-24 md:pb-16 max-w-4xl">
          <p className="text-caption uppercase tracking-[0.18em] text-sage mb-4">About</p>
          <h1 className="font-serif text-h1 md:text-display text-forest-deep leading-[1.05] tracking-tight">
            A registered society, with one job:<br />
            <span className="italic text-forest">make the paper conversation honest.</span>
          </h1>
          <p className="mt-7 text-body-lg text-ink/80 leading-relaxed">
            Paper Foundation was set up to push back — gently, with evidence — against the two
            extremes that dominate the public conversation about paper. One says paper is
            inherently destructive. The other says paper is inherently virtuous. Both are wrong,
            and both make it harder for India to build the careful, circular paper system we
            actually need.
          </p>
          <p className="mt-5 text-[15px] text-ink-2 leading-relaxed">
            <span className="font-medium text-ink">{foundation.legalName}</span> is registered
            under the {foundation.registration.act} (Reg. No.{" "}
            {foundation.registration.number}, dated {foundation.registration.registeredOn}) at{" "}
            {foundation.address.line1}, {foundation.address.line2}, {foundation.address.city} —
            {" "}{foundation.address.state}, {foundation.address.country}.
          </p>
        </div>
      </section>

      <section id="principles" className="section-y">
        <div className="container max-w-5xl">
          <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">Principles</p>
          <h2 className="font-serif text-h2 md:text-[2.5rem] text-forest-deep leading-tight max-w-2xl mb-12">
            Four commitments we hold ourselves to.
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="flex gap-5">
                  <div className="w-11 h-11 shrink-0 rounded-card bg-paper-2 border border-rule grid place-items-center text-forest">
                    <p.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-h3 text-forest-deep mb-2">{p.title}</h3>
                    <p className="text-ink/80 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Timeline />

      <section
        className="border-y border-rule"
        style={{
          background: "var(--forest-deep)",
          color: "var(--paper)",
          padding: "clamp(80px, 12vw, 140px) 0",
        }}
      >
        <div className="container max-w-5xl">
          <div className="j-mono mb-4" style={{ color: "rgba(250,248,245,0.6)" }}>
            HONESTY · WHAT WE ARE NOT
          </div>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: 1000,
            }}
          >
            Four things we are <em style={{ color: "#C4956A" }}>not</em>.
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 mt-14">
            {[
              [
                "We are not an industry lobby.",
                "We do not represent the commercial interests of paper manufacturers, mills or trade bodies. Industry partnerships are disclosed at the article level.",
              ],
              [
                "We are not an activist campaign.",
                "We do not run anti-paper or anti-digital crusades. Our remit is evidence, not slogans. We push back on bad arguments on both sides.",
              ],
              [
                "We are not a marketing channel.",
                "We do not accept sponsored articles, paid placements, or affiliate links. Our editorial firewall is published, and no funder reviews articles before publication.",
              ],
              [
                "We are not a finished project.",
                "We are a young society. We will get things wrong. When we do, we will say so on the article — dated, visible, and not quietly edited.",
              ],
            ].map(([t, b]) => (
              <div
                key={t}
                style={{
                  borderTop: "1px solid rgba(250,248,245,0.18)",
                  paddingTop: 18,
                }}
              >
                <h3
                  className="font-serif"
                  style={{
                    fontSize: 22,
                    lineHeight: 1.3,
                    letterSpacing: "-0.005em",
                    color: "var(--paper)",
                    marginBottom: 10,
                  }}
                >
                  {t}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "rgba(250,248,245,0.74)",
                  }}
                >
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="advisors" className="bg-paper-2/50 border-y border-rule section-y">
        <div className="container max-w-5xl">
          <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">
            Advisory Board
          </p>
          <h2 className="font-serif text-h2 md:text-[2.5rem] text-forest-deep leading-tight max-w-2xl mb-12">
            People we work with.
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
            {foundation.advisors.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.08}>
                <article className="bg-paper border border-rule rounded-card p-7 h-full">
                  <p className="font-serif text-[1.35rem] text-forest-deep leading-snug">
                    {a.name}
                  </p>
                  <p className="mt-2 text-[13px] uppercase tracking-[0.12em] text-copper">
                    {a.role}
                  </p>
                  <p className="mt-4 text-[14px] text-ink/80 leading-relaxed">{a.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="methodology" className="section-y">
        <div className="container max-w-3xl">
          <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">How we work</p>
          <h2 className="font-serif text-h2 text-forest-deep leading-tight mb-8">
            A simple, public method.
          </h2>
          <ol className="space-y-7">
            {[
              {
                t: "We start with a question, not a position.",
                b: "Questions arrive from readers, journalists, classrooms and policy work. We list the question publicly before we begin.",
              },
              {
                t: "We gather primary sources.",
                b: "FAO, CPPRI, IPMA, MoEFCC, TERI, ICFRE, CEPI, EPA WARM, peer-reviewed lifecycle studies. We avoid press releases and second-hand summaries.",
              },
              {
                t: "We draft, then have it read by someone with skin in the game.",
                b: "Each article gets at least one external reader — usually someone whose view it might challenge — before publication.",
              },
              {
                t: "We publish with sources visible, and correct in public.",
                b: "Citations are inline. If we get something wrong, we add a dated correction note at the top of the article and on our corrections page.",
              },
            ].map((s, i) => (
              <li key={i} className="grid grid-cols-[3rem_1fr] gap-5">
                <span className="font-serif text-h2 text-forest-deep leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif text-[1.25rem] text-forest-deep leading-snug">{s.t}</p>
                  <p className="mt-2 text-ink/80 leading-relaxed">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="campaigns" className="bg-paper-2/50 border-y border-rule section-y">
        <div className="container max-w-6xl">
          <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">Campaigns</p>
          <h2 className="font-serif text-h2 md:text-[2.5rem] text-forest-deep leading-tight max-w-2xl mb-3">
            Think Planet · Think Print.
          </h2>
          <p className="text-body-lg text-ink/80 max-w-3xl mb-12 leading-relaxed">
            In partnership with the{" "}
            <a
              href="https://www.printlovers.in/"
              className="editorial-link text-forest"
              target="_blank"
              rel="noreferrer"
            >
              Forum of Print Lovers
            </a>{" "}
            and the Power of Print initiative, we produce public-awareness material that
            reaches readers in multiple Indian languages.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gallery.map((g, i) => (
              <Reveal key={g.src} delay={i * 0.06}>
                <figure className="rounded-card border border-rule bg-paper overflow-hidden shadow-card group lift">
                  <div className="relative aspect-[3/4] bg-paper-2 overflow-hidden">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="p-3 text-[12px] uppercase tracking-[0.14em] text-ink-2 text-center">
                    {g.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="registration" className="section-y">
        <div className="container max-w-5xl grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <div>
            <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">
              Registration & Governance
            </p>
            <h2 className="font-serif text-h2 text-forest-deep leading-tight mb-6">
              Registered. Public. Accountable.
            </h2>
            <dl className="space-y-3 text-[15px]">
              <Row k="Legal name" v={foundation.legalName} />
              <Row
                k="Act"
                v={`${foundation.registration.act}`}
              />
              <Row k="Registration No." v={foundation.registration.number} />
              <Row k="Certificate No." v={foundation.registration.certNo} />
              <Row k="Registered on" v={foundation.registration.registeredOn} />
              <Row k="Issued by" v={foundation.registration.authority} />
              <Row
                k="Registered office"
                v={`${foundation.address.line1}, ${foundation.address.line2}, ${foundation.address.city} — ${foundation.address.state}, ${foundation.address.country}`}
              />
            </dl>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/docs/paper-foundation-bylaws.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-[8px] border border-forest text-forest hover:bg-forest hover:text-paper transition-colors text-[13px]"
              >
                <FileText size={14} /> Read the bylaws
              </a>
              <a
                href="/docs/first-meeting-notice.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-[8px] border border-admin-border text-ink hover:border-forest hover:text-forest transition-colors text-[13px]"
              >
                <Download size={14} /> First meeting notice
              </a>
            </div>
          </div>
          <Reveal>
            <figure className="rounded-card border border-rule bg-paper overflow-hidden shadow-card">
              <div className="relative aspect-[3/4] bg-paper-2">
                <Image
                  src="/photos/registration-certificate.jpg"
                  alt="Government of Telangana certificate of registration for Paper Foundation"
                  fill
                  sizes="(min-width: 1024px) 35vw, 90vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="p-4 text-[12px] uppercase tracking-[0.14em] text-ink-2 text-center">
                Certificate of Registration · No. {foundation.registration.number}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section id="funding" className="bg-paper-2/50 border-t border-rule section-y">
        <div className="container max-w-3xl">
          <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">
            Funding & Independence
          </p>
          <h2 className="font-serif text-h2 text-forest-deep leading-tight mb-6">
            Where our money comes from — and what that means for our editorial.
          </h2>
          <p className="text-body-lg text-ink/85 leading-relaxed">
            As a registered society, Paper Foundation publishes annual disclosures of its
            funders. Operating support comes from a mix of foundation grants, industry
            partnerships, and small individual donations. Industry support is disclosed at the
            article level wherever relevant, and no funder reviews articles before publication.
            We do not accept advertising, sponsored articles, or pay-to-play placements.
          </p>
        </div>
      </section>

      <section id="corrections" className="section-y">
        <div className="container max-w-3xl">
          <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">
            Corrections policy
          </p>
          <h2 className="font-serif text-h2 text-forest-deep leading-tight mb-6">
            We correct in public, with the date.
          </h2>
          <p className="text-body-lg text-ink/85 leading-relaxed">
            If you spot an error — a misquoted figure, a missing context, an outdated source —
            write to{" "}
            <a
              href={`mailto:${foundation.contactEmail}`}
              className="editorial-link text-forest"
            >
              {foundation.contactEmail}
            </a>
            . We respond within 5 working days and post visible correction notes on any article
            we change.
          </p>
        </div>
      </section>

      <section className="bg-forest-deep text-paper paper-grain dark-grain">
        <div className="container max-w-3xl py-20 text-center">
          <p className="text-caption uppercase tracking-[0.18em] text-copper mb-4">
            Become a member
          </p>
          <h3 className="font-serif text-h1 leading-tight mb-6">
            Join the Paper Foundation membership.
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/docs/membership-application.pdf" variant="dark" size="lg">
              Download application
            </Button>
            <Button href="/contact" variant="secondary" size="lg" className="border-paper text-paper hover:bg-paper hover:text-forest-deep">
              Contact us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-rule pb-3 last:border-0">
      <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-2 pt-0.5">{k}</dt>
      <dd className="text-ink leading-relaxed">{v}</dd>
    </div>
  );
}
