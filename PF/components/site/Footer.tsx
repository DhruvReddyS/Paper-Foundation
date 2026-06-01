import Link from "next/link";
import { Logo } from "./Logo";
import { foundation } from "@/lib/foundation";

const cols = [
  {
    title: "Foundation",
    links: [
      { href: "/about", label: "About" },
      { href: "/about#principles", label: "Principles" },
      { href: "/about#advisors", label: "Advisory Board" },
      { href: "/about#registration", label: "Registration" },
      { href: "/about#funding", label: "Funding & Independence" },
    ],
  },
  {
    title: "Knowledge",
    links: [
      { href: "/knowledge", label: "Articles" },
      { href: "/myths", label: "Myths vs Facts" },
      { href: "/resources", label: "Reports & Reading" },
      { href: "/knowledge?category=circularity", label: "Circularity" },
    ],
  },
  {
    title: "Engage",
    links: [
      { href: "/get-involved", label: "Become a Member" },
      { href: "/docs/membership-application.pdf", label: "Membership Form (PDF)" },
      { href: "/get-involved#volunteer", label: "Volunteer" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Documents",
    links: [
      { href: "/docs/paper-foundation-bylaws.pdf", label: "Bylaws" },
      { href: "/docs/first-meeting-notice.pdf", label: "First Meeting Notice" },
      { href: "/about#corrections", label: "Corrections Policy" },
      { href: "/about#disclosure", label: "Editorial Disclosure" },
    ],
  },
];

const sourcesStrip = [
  "FAO",
  "CPPRI",
  "IPMA",
  "MoEFCC",
  "TERI",
  "CEPI",
  "Two Sides Global",
  "EPA WARM",
  "The Shift Project",
  "ICFRE",
  "ILO",
  "Forum of Print Lovers",
];

export function Footer() {
  return (
    <footer className="mt-24 bg-forest-deep text-paper paper-grain dark-grain">
      <div className="overflow-hidden border-b border-paper/10">
        <div className="marquee-track py-4 text-[12px] tracking-[0.18em] uppercase opacity-60">
          {[...sourcesStrip, ...sourcesStrip].map((s, i) => (
            <span key={i} className="px-8 whitespace-nowrap">
              Sources & partners · {s}
            </span>
          ))}
        </div>
      </div>

      <div className="container py-16 grid gap-12 lg:grid-cols-[1.4fr_3fr]">
        <div className="space-y-5 max-w-sm">
          <Logo tone="paper" />
          <p className="font-serif italic text-[15px] text-paper/80">
            "Love Paper, use Paper without Hesitation."
          </p>
          <p className="text-[14px] opacity-75 leading-relaxed">
            Paper Foundation is a registered society advocating evidence-based understanding of
            paper, printing, recycling and circularity in India.
          </p>
          <p className="text-[12px] opacity-60 leading-relaxed">
            {foundation.address.line1}<br />
            {foundation.address.line2}<br />
            {foundation.address.city} — {foundation.address.state}, {foundation.address.country}
          </p>
          <p className="text-[12px] opacity-50">
            Reg. No. {foundation.registration.number} ·{" "}
            {foundation.registration.act}.<br />
            © {new Date().getFullYear()} Paper Foundation. Content licensed under{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              className="underline"
              rel="noreferrer"
              target="_blank"
            >
              CC BY 4.0
            </a>
            .
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-[12px] uppercase tracking-[0.16em] opacity-50 mb-4">
                {c.title}
              </p>
              <ul className="space-y-2.5 text-[14px]">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="opacity-90 hover:opacity-100 hover:text-copper transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container py-5 flex flex-col sm:flex-row justify-between gap-3 text-[12px] opacity-60">
          <p>Hyderabad · Source-cited · Non-partisan · Open access</p>
          <p>
            <a href={`mailto:${foundation.contactEmail}`} className="hover:text-copper">
              {foundation.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
