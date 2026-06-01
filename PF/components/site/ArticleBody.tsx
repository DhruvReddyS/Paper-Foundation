"use client";

import { useEffect, useRef, useState } from "react";

type Ref = { title: string; org: string; url: string; note?: string };

export function ArticleBody({ html, references }: { html: string; references: Ref[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<{ id: string; text: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const headings = Array.from(ref.current.querySelectorAll("h2"));
    const items = headings.map((h) => {
      if (!h.id) {
        h.id = (h.textContent || "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
      return { id: h.id, text: h.textContent || "" };
    });
    setToc(items);

    // attach citation popovers
    const sups = Array.from(ref.current.querySelectorAll("sup[data-cite]"));
    sups.forEach((sup) => {
      const idx = Number((sup as HTMLElement).dataset.cite || "0") - 1;
      const cite = references[idx];
      if (!cite) return;
      sup.innerHTML = `<button type="button" class="text-forest font-semibold" aria-label="Citation ${idx + 1}">[${idx + 1}]</button>`;
      const btn = sup.querySelector("button");
      if (!btn) return;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        // toggle a popover
        const existing = sup.querySelector(".pf-pop");
        if (existing) {
          existing.remove();
          return;
        }
        const pop = document.createElement("span");
        pop.className =
          "pf-pop absolute z-30 mt-2 left-0 w-80 max-w-[80vw] p-4 rounded-card bg-paper border border-rule shadow-card-hover text-[13px] leading-relaxed not-italic font-sans text-ink block";
        pop.innerHTML = `
          <span class="block text-[11px] uppercase tracking-[0.16em] text-sage mb-1.5">Source ${idx + 1}</span>
          <span class="block font-medium text-ink mb-1">${cite.title}</span>
          <span class="block text-ink-2 mb-2">${cite.org}</span>
          <a href="${cite.url}" target="_blank" rel="noreferrer" class="text-forest underline text-[12px]">Open source ↗</a>
        `;
        (sup as HTMLElement).style.position = "relative";
        sup.appendChild(pop);
        const close = (ev: MouseEvent) => {
          if (!pop.contains(ev.target as Node) && ev.target !== btn) {
            pop.remove();
            document.removeEventListener("click", close);
          }
        };
        setTimeout(() => document.addEventListener("click", close), 10);
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [references]);

  return (
    <div className="grid lg:grid-cols-[200px_1fr] gap-12">
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-2 mb-4">On this page</p>
          <ul className="space-y-2.5 text-[13px] leading-snug border-l border-rule">
            {toc.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className={`block pl-4 -ml-px border-l transition-colors ${
                    activeId === t.id
                      ? "border-forest text-forest"
                      : "border-transparent text-ink-2 hover:text-forest"
                  }`}
                >
                  {t.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div ref={ref} className="prose-paper max-w-prose" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
