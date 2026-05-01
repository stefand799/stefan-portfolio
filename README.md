# stefan-portfolio

Personal portfolio built with **Next.js 16**, **Tailwind CSS v4**, and **MDX**.  
Design direction: *Terminal Minimal* — monospace typography, cream/dark palette, cursor animations.

**Live:** [stefantech.space](https://stefantech.space)

---

## Tech stack

| | |
|---|---|
| [Next.js 16](https://nextjs.org) (App Router) | Framework |
| [TypeScript 5](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling |
| [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) | MDX rendering |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | Frontmatter parsing |
| [JetBrains Mono](https://www.jetbrains.com/lp/mono/) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) | Typography |
| [Vercel](https://vercel.com) | Hosting |

---

## Getting started

```bash
git clone https://github.com/stefand799/stefan-portfolio.git
cd stefan-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
src/
├── app/                        # Pages (Next.js App Router)
│   ├── layout.tsx              # Root layout — fonts, Navbar, Footer
│   ├── page.tsx                # Homepage — assembles all sections
│   ├── globals.css             # CSS variables, Tailwind theme, dark mode
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx    # Individual blog post (MDX)
│   └── contact/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation + dark mode toggle
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── TerminalCursor.tsx  # Blinking █ cursor
│   │   ├── CommandPrompt.tsx   # ~/stefan $ prefix
│   │   ├── ThemeToggle.tsx     # Light / dark switcher
│   │   ├── ProjectCard.tsx
│   │   ├── TechTag.tsx
│   │   └── BlogCard.tsx
│   └── sections/               # Homepage sections
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Experience.tsx
│       ├── Skills.tsx
│       ├── FeaturedProjects.tsx
│       └── ContactSection.tsx
│
├── lib/
│   ├── mdx.ts                  # getProjects(), getPosts(), getPostBySlug()
│   └── utils.ts                # cn(), formatDate()
├── hooks/
│   └── useTypingEffect.ts      # Typing animation for Hero
└── types/
    └── index.ts                # Project, BlogPost, ExperienceItem

content/
├── projects/                   # One .mdx file per project
└── blog/                       # One .mdx file per post

public/
└── cv-stefan-dinu.pdf          # Resume — linked from /contact
```

---

## Customizing content

### Personal info & sections

Each homepage section is a standalone component in `src/components/sections/`. Edit them directly:

| What to change | File |
|---|---|
| Name, bio, CTA buttons | `src/components/sections/Hero.tsx` |
| About text, education, location | `src/components/sections/About.tsx` |
| Work experience entries | `src/components/sections/Experience.tsx` — edit the `experiences` array |
| Skills | `src/components/sections/Skills.tsx` — edit the `skillGroups` array |
| Contact links | `src/components/sections/ContactSection.tsx` — edit the `socials` array |
| Nav links | `src/components/layout/Navbar.tsx` — edit the `links` array |

### Adding a project

Create a new file in `content/projects/`:

```mdx
---
title: "Project Name"
description: "One or two sentences."
date: "2025-06-01"
tags: ["TypeScript", "React"]
github: "https://github.com/stefand799/project"
live: "https://project.vercel.app"   # optional
featured: true                        # shows on homepage
---

## About

What it does and why you built it.

## What I learned

The interesting technical parts.
```

The project appears automatically on `/projects`. If `featured: true`, it also shows in the homepage section (top 3 by date).

### Writing a blog post

Create a new file in `content/blog/`:

```mdx
---
title: "Post title"
date: "2025-06-01"
description: "Short description shown in the card."
tags: ["Next.js", "TypeScript"]
---

Post content in Markdown...
```

The post appears automatically at `/blog/slug-from-filename`.

### Updating the CV

Replace `public/cv-stefan-dinu.pdf` with your updated file. The download link in `/contact` points to that path — no code changes needed.

---

## Design system

Colors are defined as CSS variables in `src/app/globals.css`:

```css
/* Light mode */
:root {
  --color-bg:     #F5F2EB;   /* cream background */
  --color-fg:     #1A1A1A;   /* near-black text */
  --color-muted:  #6B6B6B;   /* secondary text */
  --color-border: #D4D0C8;   /* subtle borders */
  --color-prompt: #4A7C59;   /* terminal green ~/stefan $ */
}

/* Dark mode (.dark class on <html>) */
.dark {
  --color-bg:     #111111;
  --color-fg:     #F0EDE4;
  --color-muted:  #888888;
  --color-border: #252525;
  --color-prompt: #5A9E6F;
}
```

Dark mode is toggled via the `[ dark ] / [ light ]` button in the navbar. The preference is persisted in `localStorage` and respects `prefers-color-scheme` on first visit.

---

## Deployment

Push to GitHub, then import the repository on [vercel.com](https://vercel.com) — Next.js is auto-detected, no configuration needed.

**Connect the domain:**  
Vercel Dashboard → Project → Settings → Domains → add `stefantech.space`  
Then add the `A` or `CNAME` record shown by Vercel to your DNS.
