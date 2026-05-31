# Modern Animated Components

_Started 2026-05-17 16:56 UTC_

---

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "PAPER FOUNDATION"
Current date is now May 17, 2026
</system-info>

<default aesthetic>
If no references, art direction or design systems were provided, use this default professional modern, minimal aesthetic as a base. Declare your choice out loud so you stick to it. Guidance:
- Choose a type pairing from web-safe set or Google Fonts. Helvetica is a good choice. Avoid hard-to-read or overly stylized fonts. Use 1-3 fonts only.
- Foreground and background: choose a color tone (warm, cool, neutral, something in-between). Use subtly-toned whites and blacks; avoid saturations above 0.02 for whites.
- Accents: choose 0-2 additional accent colors using oklch. All accents should share same chroma and lightness; vary hue.
- NEVER write out an SVG yourself that's more complicated than a square, circle, diamond, etc.
- For imagery, never hand-draw SVGs; use subtly-striped SVG placeholders instead with monospace explainers for what should be dropped there (e.g. “product shot”)

CRITICAL: ignore default aesthetic entirely if given other aesthetic instructions like reference images, design systems or guidance, or if there are files in the project already.
</default aesthetic>

<pasted_text name="Pasted text (657 lines)">
# MASTER CLAUDE UI DESIGN PROMPT — PAPER FOUNDATION INDIA

You are a world-class product designer and editorial UX architect designing the digital platform for **Paper Foundation India** — an evidence-based NGO and public knowledge platform focused on paper sustainability, recycling, circularity, forestry, responsible use, and the Indian paper ecosystem.

Your job is to create premium, production-grade UI concepts, layouts, design systems, interaction ideas, component architecture, and realistic visual mockups.

The final output must feel like:

* A modern editorial publication
* A premium institutional research platform
* A calm, trustworthy public knowledge organization
* A globally respected think tank

NOT:

* A generic NGO website
* A corporate sustainability microsite
* An activist campaign page
* A startup landing page
* A template-based design

---

# BRAND POSITIONING

Paper Foundation India exists to improve public understanding of paper through:

* research-backed information
* evidence-oriented communication
* nuanced sustainability education
* myth clarification
* transparent sourcing

Core philosophy:

> “Use paper responsibly, confidently, and with fair understanding.”

The platform should communicate:

* intellectual honesty
* credibility
* clarity
* transparency
* calm authority

Every design decision should reinforce trust.

---

# VISUAL DIRECTION

## Design Personality

The design language should feel like:

* Kinfolk meets Nature Research
* Editorial publication meets modern policy institute
* Calm academia meets premium sustainability intelligence

Keywords:

* warm
* refined
* intelligent
* minimal
* editorial
* breathable
* evidence-driven
* sophisticated
* timeless

---

# COLOR SYSTEM

## Primary Palette

Background:

* #FAF8F5 → warm paper white
* #F2EDE7 → recycled paper tone

Primary:

* #2D5F3E → forest green
* #3A7A50 → lighter forest green

Accent:

* #8B9D77 → sage
* #C4956A → muted copper

Text:

* #2C2C2C → charcoal
* #6B6B6B → secondary

Borders:

* #E0DAD2

Dark Sections:

* #244D32
* #2D5F3E

Rules:

* Copper is extremely limited
* No bright greens
* No neon
* No gradients heavier than subtle opacity layering
* No blue-heavy palettes
* Avoid pure white and pure black

---

# TYPOGRAPHY

## Fonts

Headlines:

* Libre Baskerville
* or premium editorial serif alternatives

Body:

* DM Sans

DO NOT USE:

* Inter
* Roboto
* Arial
* Poppins
* Montserrat

---

## Typography Hierarchy

Display:

* 56px
* line-height 1.05
* slight negative tracking

H1:

* 40px

H2:

* 32px

H3:

* 24px

Body Large:

* 18px

Body:

* 16px

Caption:

* 12px

Rules:

* strong contrast between heading and body
* generous line height (1.7)
* beautiful reading rhythm
* optimized for long-form reading

---

# LAYOUT SYSTEM

## Grid

* 12-column desktop grid
* max-width: 1200px
* centered layouts
* article content width: 680px

Spacing:

* 96px section spacing desktop
* 64px tablet
* 32px mobile

Padding:

* 64px desktop
* 48px tablet
* 24px mobile

Whitespace should feel luxurious and intentional.

Density destroys trust.

---

# COMPONENT STYLE

## Cards

* radius: 12px
* soft shadows only
* layered surfaces
* subtle elevation

NO:

* overdesigned cards
* noisy illustrations
* giant shadows
* glossy effects

Cards should contain:

* title
* short excerpt
* metadata
* one action

Nothing more.

---

## Buttons

Primary:

* forest green background
* white text
* subtle hover darkening

Secondary:

* outlined
* transparent background

Radius:

* 8px

Padding:

* 12px 24px minimum

---

# VISUAL LANGUAGE

## Allowed Visual Elements

Use:

* abstract SVG systems
* layered paper geometry
* fiber textures
* editorial framing
* circular system diagrams
* subtle grid overlays
* node-and-connection patterns
* paper layering

DO NOT USE:

* leaves
* trees
* globes
* cartoon recycling symbols
* cheesy eco illustrations
* stock sustainability imagery

The platform should feel intellectually designed, not environmentally cliché.

---

# INTERACTIONS

Animation philosophy:

* restrained
* elegant
* subtle
* meaningful

Allowed:

* fade-in-up
* soft hover elevation
* opacity transitions
* smooth reveal states
* count-up statistics
* gentle SVG movement

Avoid:

* bouncing
* heavy parallax
* flashy transitions
* excessive motion
* loud microinteractions

All animations must respect:
prefers-reduced-motion

---

# RESPONSIVE BEHAVIOR

## Mobile

* single-column layouts
* large touch spacing
* 16px body text minimum
* intentional stacking
* mobile-first readability

## Tablet

* selective two-column layouts
* balanced spacing

## Desktop

* TOC sidebars
* editorial grids
* asymmetrical compositions where useful

Never make mobile feel like squeezed desktop.

---

# DESIGN PRINCIPLES

The site should:

* feel evidence-oriented
* reward reading
* encourage exploration
* support scanning and deep reading equally
* feel premium without luxury theatrics
* communicate seriousness through typography and spacing

Users should think:

> “This organization feels trustworthy and modern.”

---

# PUBLIC SITE PAGES

Design these pages with realistic content and production-grade layouts:

## Homepage

Include:

1. thin campaign banner
2. hero section
3. trust indicators
4. interactive myth widget
5. featured research/articles
6. circularity explainer
7. impact statistics
8. newsletter signup
9. footer

Hero layout:

* left: editorial copy + CTA
* right: abstract SVG visualization

---

## Knowledge Hub Article Page

Include:

* reading progress bar
* sticky table of contents
* article metadata
* citations
* pull quotes
* inline references
* related articles
* CTA block

Article width:

* max 680px

Typography must feel exceptional.

---

## Myths vs Facts Page

Include:

* filter tabs
* myth/fact reveal cards
* source badges
* FAQ accordions

Cards should support:

* hidden state
* revealed state
* hover state

---

## Research / Reports Page

Include:

* downloadable resources
* publication metadata
* category filters
* featured reports
* citation indicators

---

## Contact / About Pages

Must feel:

* institutional
* transparent
* warm
* minimal

---

# ADMIN DASHBOARD

The admin dashboard must feel:

* neutral
* fast
* uncluttered
* functional

Reference inspiration:

* Linear
* Notion
* modern CMS tools

## Admin Palette

Background:

* white
* #F8F9FA surfaces

Borders:

* #E5E7EB

Accent:

* forest green only

---

## Dashboard Includes

* left sidebar
* stat cards
* recent content
* inquiries
* content actions
* data tables
* clean forms

No public-site editorial styling inside admin.

---

# ARTICLE EDITOR UX

Design a long-form writing experience with:

* comfortable spacing
* distraction-free editing
* repeatable references
* SEO accordion
* publishing controls
* media uploader
* metadata management

Everything should feel thoughtfully structured.

---

# COMPONENTS TO DESIGN

Design these individually where requested:

* navbar
* hero
* article cards
* myth cards
* TOC sidebar
* FAQ accordion
* source tooltip
* quote block
* resource card
* impact counter
* signup module
* category tabs
* admin sidebar
* admin tables
* editor toolbar
* campaign banner

Show:

* default states
* hover states
* active states
* mobile versions where applicable

---

# ABSTRACT HERO SVG

Create a sophisticated SVG illustration that evokes:

* paper layers
* circularity
* transparency
* systems thinking
* fiber structures

Style:

* geometric
* editorial
* institutional
* layered

Colors:

* forest green
* sage
* warm paper white
* muted copper accents

NO:

* leaves
* literal recycling icons
* eco clichés

SVG should include:

* subtle animation
* slow floating layers
* gentle rotational movement
* elegant depth

Canvas:

* 600x500

---

# COPY STYLE

Voice:

* calm
* intelligent
* nuanced
* evidence-first

Avoid:

* sensationalism
* preaching
* guilt language
* activism tone

Preferred phrasing:

* “Research suggests…”
* “Evidence indicates…”
* “Context matters…”
* “Explore the findings…”

Avoid:

* “The truth is…”
* “You’ve been lied to…”
* “Save the planet…”

---

# SAMPLE HERO COPY

Headline:
“Understanding paper through evidence, not assumption.”

Body:
“Public conversations about paper, recycling, sustainability, and environmental impact are often shaped by simplified narratives. Paper Foundation India exists to create a more balanced, research-backed understanding of how paper fits into responsible and circular systems.”

Primary CTA:
“Explore the Facts”

Secondary CTA:
“Read the Evidence”

---

# SUCCESS CRITERIA

The design is successful when:

1. Typography alone communicates credibility
2. The experience feels premium without excess
3. Reading long content feels enjoyable
4. Spacing creates calm and confidence
5. The site avoids all NGO clichés
6. Mobile feels intentionally designed
7. The admin feels fast and invisible
8. Source citations feel integrated naturally
9. The visual system feels timeless
10. Visitors immediately trust the organization

Now design the requested page/component in full detail with:

* realistic copy
* production-grade spacing
* responsive behavior
* interaction notes
* visual hierarchy
* component states
* section-by-section breakdown
* animation guidance
* accessibility considerations
* premium editorial styling

The result should feel worthy of an internationally recognized research institution.

</pasted_text>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Hi-fi design">
Create a high-fidelity, polished design. Follow the instructions about design in your system prompt, particularly the 'How to do design work' section. Use the design_canvas starter component, or make a full-bleed prototype and offer options via Tweaks.
</attached-skill>

<attached-skill name="Interactive prototype">
Create a fully interactive prototype with realistic state management and transitions. Use React useState/useEffect for dynamic behavior. Include hover states, click interactions, form validation, animated transitions, and multi-step navigation flows. It should feel like a real working app, not a static mockup.
</attached-skill>


<system-reminder>Auto-injected reminder (ignore if not relevant): do not recreate copyrighted or branded UI unless the user's email domain matches that company. Create original designs instead.</system-reminder>

## Assistant

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: copy_starter_component]_

_[tool: read_file]_

_[tool: write_file]_

I'll build this as a design canvas presenting all six screens of Paper Foundation India, plus dedicated component spec cards. Original work — Libre Baskerville + DM Sans, the warm paper palette specified, no eco clichés. Let me make a system note: I'll use **Libre Baskerville** for display/headings, **DM Sans** for body/UI, **JetBrains Mono** for citations and metadata. Forest green primary, sage + muted copper accents, warm paper backgrounds. Abstract paper-fiber/circularity SVG language (concentric circles, layered rectangles, nodal connections).

Let me build modularly.Now the shared SVG visualization and small components:

_[tool: write_file]_

Now the homepage:

_[tool: write_file]_

Now the article page:

_[tool: write_file]_

Now Myths & Facts and Research pages:

_[tool: write_file]_

_[tool: write_file]_

Now Admin dashboard and Article editor:

_[tool: write_file]_

Now the article editor:

_[tool: write_file]_

Now the component spec card and the main canvas file:

_[tool: write_file]_

Now the main HTML file:

_[tool: write_file]_

_[tool: show_html]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Built the Paper Foundation India platform as a design canvas with eight artboards across three sections:

**Public site** — Homepage (full-bleed editorial layout, hero + abstract paper-systems SVG, interactive myth widget, featured research, dark circularity primer, animated impact stats, newsletter, full footer), Knowledge Hub article (sticky TOC, reading progress, pull quote, inline stacked-area chart, citation tooltips, references), Myths vs Facts (category filters, reveal cards, 5-item FAQ accordion), Research & Reports (featured publication with cover mockup + filterable library), and a mobile homepage.

**Editorial admin** — Dashboard (sidebar, stat cards with sparklines, content table with status dots, inbox, quick actions) and a long-form Article editor (toolbar, contenteditable body with inline figure block, right rail with collapsible Publish/SEO/References, collaborator avatars).

**Design system** — Spec card covering palette, type scale (Libre Baskerville × DM Sans × JetBrains Mono), buttons, pills, citation tag, and shadow tiers.

All original, no eco clichés — the visual language is paper layers, fiber textures, concentric orbits and node-and-connection diagrams. Forest green primary, copper used sparingly. `prefers-reduced-motion` respected.

Next steps if useful: contact/about pages, donation flow, search results UX, or a tweakable palette/font switcher.

## User

i want creative stuff to be included not simple text thats it animated components and modern design not routine oness
make it fully modern creative and coolerrrrr

## Assistant

_[tool: write_file]_

Cranking the creativity. Adding kinetic typography, parallax paper, animated fibre-flow circularity, magnetic CTAs, infinite evidence marquee, draggable timeline scrubber, 3D myth flip cards, and a custom cursor. New v2 homepage as the focus artboard.Now add the keyframes and wire the v2 homepage as the primary artboard:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Layered in the creative work. The new **Homepage v2 · creative** is now the featured artboard:

- **Hero** — kinetic headline with a cycling word ("evidence / research / context / method"), staggered letter reveals, parallax paper sheets that tilt with the mouse in 3D, animated fibre orbits, floating data callouts, magnetic CTA buttons, custom cursor with smart labels
- **Live evidence marquee** — infinite-scroll ticker of citations with a pulsing dot
- **Featured articles** — list reveals a floating preview card on hover with row-level expansion
- **Kinetic banner** — large editorial typography moment ("Paper is not the enemy. It's a system.")
- **Interactive circularity** — five-node loop with continuously orbiting particles; tap any stage to swap the side panel with animated stat + source
- **Timeline scrubber** — drag through 2001 → 2024 or hit play; stacked bars and source mix rearrange smoothly
- **3D myth flip cards** — stacked card deck, click to flip in 3D, navigate with arrows; back side is dark forest with the evidence
- **Impact stats** — counters and sparklines that draw in on scroll via IntersectionObserver

V1 remains beside it for comparison. All animations respect `prefers-reduced-motion`.

## User

Verifier agent check completed

