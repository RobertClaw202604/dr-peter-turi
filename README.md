# Dr. Peter Turi, MD — Medical Aviation Expert

Professional profile website for **Dr. Péter Túri** — emergency physician, trauma & hand
surgeon, architect of modern Hungarian HEMS, founder of TrustAir Aviation Ltd., board member
of EHAC (European HEMS & Air Ambulance Committee).

Audience: training companies, governments, operators and insurers looking for proven
aeromedical expertise.

- **Design:** deep navy / medical gold / rescue red, radar + crosshair motifs, clinical calm
- **Languages:** English, German, French (client-side i18n, auto-detected + remembered)
- **Sections:** Profile · Expertise · Career timeline · Publications & media · Contact
- **Static site** — no build step. Plain HTML/CSS/JS.

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Structure

```
index.html          — single page, all sections
assets/style.css    — design system
assets/i18n.js      — EN / DE / FR dictionaries
assets/app.js       — language switch, mobile nav, scroll reveal
```

## Deploy

GitHub Pages from `main` branch root.

## Contact form

Uses FormSubmit (https://formsubmit.co) pointed at `turi.peter@trustair.hu`.
The recipient must confirm the address once, on the first submission.
