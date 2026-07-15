# Bhuvanagiri D — Portfolio

A premium, single-page portfolio built with plain HTML, CSS, and JavaScript — no build step required.

## ✨ Features

- Terminal-style hero with a typed Python "developer object" as the signature visual
- Light / dark theme toggle (defaults to light)
- ⌘K / Ctrl+K command palette for jumping to any section
- Scroll progress bar, custom cursor, back-to-top button
- Tabbed, animated skill bars
- Filterable project grid (All / AI / Web / Mobile)
- Chronological experience + education timeline
- Certifications, services, tech-stack marquee, achievements, live GitHub stats, blog, testimonials
- Floating-label contact form (front-end only — wire up EmailJS or a backend to send for real)
- Custom 404 page, `robots.txt`, `sitemap.xml`, Open Graph / Twitter / JSON-LD meta tags
- Fully responsive, respects `prefers-reduced-motion`, keyboard-accessible command palette and nav

## 📂 Files

| File | Purpose |
|---|---|
| `index.html` | Page structure & content |
| `style.css` | Design tokens, layout, animations |
| `script.js` | Interactivity (theme, palette, filters, reveal animations, GitHub stats) |
| `profile.jpg` | Profile photo |
| `resume.pdf` | Placeholder resume — replace with your real one |
| `404.html` | Custom not-found page |
| `robots.txt` / `sitemap.xml` | Basic SEO scaffolding |

## ⚙️ Before you deploy

1. In `script.js`, set `GITHUB_USERNAME` to your real GitHub username for live stats.
2. Replace `resume.pdf` with your actual resume.
3. Swap the placeholder email, phone, and social links in `index.html` (hero + contact section) for your real ones.
4. Replace project links (`#`) in the Projects section with real GitHub/demo URLs.
5. Update `robots.txt` and `sitemap.xml` with your real domain once deployed.
6. To actually send contact-form messages, connect [EmailJS](https://www.emailjs.com/) or a small backend endpoint in `script.js`.

## 🚀 Deploy

Works on any static host — no build step:

- **GitHub Pages**: push to a repo, enable Pages on the `main` branch.
- **Netlify / Vercel**: drag-and-drop the folder, or connect the repo (framework: "Other" / static).

## 🛠️ Tech

HTML5, CSS3 (custom properties, no framework), vanilla JavaScript. Fonts: Space Grotesk, Inter, JetBrains Mono.
