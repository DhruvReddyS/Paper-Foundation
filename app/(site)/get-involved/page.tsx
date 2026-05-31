import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Handshake,
  GraduationCap,
  Sprout,
  Download,
  Mail,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { foundation } from "@/lib/foundation";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Become a member, partner with us, or join the volunteer circle.",
};

const lanes = [
  {
    icon: Handshake,
    title: "Partner with us",
    body: "Industry bodies, mills, recyclers, research labs, and policy institutions: we partner on research, public explainers, and translated material.",
    cta: "Discuss a partnership",
    type: "partnership",
  },
  {
    icon: GraduationCap,
    title: "Contribute as a researcher",
    body: "Academics and students: pitch us a question, share a paper that hasn't gotten public airtime, or co-author a sourced explainer.",
    cta: "Pitch a contribution",
    type: "research",
  },
  {
    icon: Sprout,
    title: "Volunteer",
    body: "Translators (Telugu, Hindi, Malayalam, Tamil, Bengali, Kannada and more), illustrators, data engineers and editors — we welcome a small volunteer circle.",
    cta: "Apply to volunteer",
    type: "volunteer",
  },
];

const membershipSteps = [
  {
    n: "01",
    title: "Download the application",
    body: "A short PDF form that captures your background and how you'd like to engage with the foundation.",
  },
  {
    n: "02",
    title: "Fill in and sign",
    body: "Print, fill in, sign, and scan — or sign digitally if your reader supports it.",
  },
  {
    n: "03",
    title: "Send it to us",
    body: `Email the completed form to ${foundation.contactEmail} or post it to our registered office in Hyderabad.`,
  },
  {
    n: "04",
    title: "We review and confirm",
    body: "Memberships are reviewed by the executive committee. We confirm by email within 2–3 weeks.",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <section className="paper-grain border-b border-rule">
        <div className="container pt-16 pb-12 md:pt-24 md:pb-16 max-w-4xl">
          <p className="text-caption uppercase tracking-[0.18em] text-sage mb-4">
            Get Involved
          </p>
          <h1 className="font-serif text-h1 md:text-display text-forest-deep leading-[1.05] tracking-tight">
            We grow when more people<br />
            <span className="italic text-forest">help write the evidence.</span>
          </h1>
          <p className="mt-6 text-body-lg text-ink/80 max-w-2xl leading-relaxed">
            Paper Foundation is a small, registered society. We collaborate with researchers,
            journalists, industry, and policymakers — and a tight volunteer and member circle —
            to keep the publication credible and current.
          </p>
        </div>
      </section>

      <section id="membership" className="section-y">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
            <div>
              <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">
                Membership
              </p>
              <h2 className="font-serif text-h2 md:text-[2.5rem] text-forest-deep leading-tight mb-5">
                Become a member of Paper Foundation.
              </h2>
              <p className="text-body-lg text-ink/85 leading-relaxed">
                Members participate in our annual general meeting, shape our research agenda,
                and receive printed copies of our flagship reports. Membership is open to
                individuals working in or close to paper, print, publishing, recycling,
                forestry, education, or environmental policy.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/docs/membership-application.pdf" variant="primary" size="lg">
                  <Download size={16} /> Membership form (PDF)
                </Button>
                <Button href="/docs/paper-foundation-bylaws.pdf" variant="secondary" size="lg">
                  <FileText size={16} /> Read the bylaws
                </Button>
              </div>
              <div className="mt-6 rounded-card border border-rule bg-paper-2/50 p-5 text-[13px] text-ink-2">
                Questions before applying?{" "}
                <a
                  href={`mailto:${foundation.contactEmail}?subject=Paper%20Foundation%20Membership`}
                  className="editorial-link text-forest"
                >
                  Email us at {foundation.contactEmail}
                </a>
                .
              </div>
            </div>

            <ol className="space-y-5">
              {membershipSteps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.06}>
                  <li className="grid grid-cols-[3rem_1fr] gap-5 rounded-card border border-rule bg-paper p-5">
                    <span className="font-serif text-[1.85rem] text-forest-deep leading-none">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-serif text-[1.15rem] text-forest-deep leading-snug">
                        {s.title}
                      </p>
                      <p className="mt-1.5 text-[14px] text-ink/80 leading-relaxed">{s.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-rule bg-paper-2/40 section-y">
        <div className="container">
          <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">
            Other ways to engage
          </p>
          <h2 className="font-serif text-h2 text-forest-deep leading-tight mb-10 max-w-2xl">
            Three lanes — pick whichever fits your work.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {lanes.map((l, i) => (
              <Reveal key={l.title} delay={i * 0.08}>
                <div
                  id={l.type}
                  className="rounded-card border border-rule bg-paper shadow-card p-7 flex flex-col h-full lift"
                >
                  <div className="w-11 h-11 rounded-card bg-paper-2 grid place-items-center text-forest mb-5">
                    <l.icon size={20} />
                  </div>
                  <h3 className="font-serif text-h3 text-forest-deep">{l.title}</h3>
                  <p className="mt-3 text-ink/80 leading-relaxed">{l.body}</p>
                  <Link
                    href={`/contact?type=${l.type}`}
                    className="mt-6 inline-flex items-center gap-2 text-forest text-[14px]"
                  >
                    {l.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="donate" className="section-y">
        <div className="container max-w-3xl text-center">
          <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">Donations</p>
          <h2 className="font-serif text-h2 text-forest-deep leading-tight mb-5">
            Individual donations — coming soon.
          </h2>
          <p className="text-body-lg text-ink/85 leading-relaxed">
            We are working through the relevant Indian regulations so that individual donations
            can be accepted transparently and tax-receipted. Until then, the best way to support
            our work is to <em>read it, cite it, and tell us where we could do better.</em>
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="primary">
              <Mail size={15} /> Get in touch
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
