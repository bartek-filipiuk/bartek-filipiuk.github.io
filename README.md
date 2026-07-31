# Bartek Filipiuk — Portfolio

The source for [bartek-filipiuk.github.io](https://bartek-filipiuk.github.io):
a curated engineering portfolio focused on software architecture, AI-assisted
development, developer infrastructure and production-ready web systems.

The site deliberately avoids presenting GitHub activity as a résumé or ranking
projects by stars. Featured work is selected and described by a human; GitHub
metadata supplies factual repository details and stays automatically refreshed.

## Stack

- Next.js with strict TypeScript
- React and Tailwind CSS
- static export for GitHub Pages
- GitHub REST API metadata cache
- GitHub Actions for build, refresh and deployment
- an additional Vinext build target used by the hosted working copy

No database, CMS, analytics script or browser-side GitHub API request is needed.

## Project structure

```text
app/
  content.ts                 archive, process and capability content
  page.tsx                   portfolio page and archive interactions
  globals.css                complete visual system and responsive rules
  layout.tsx                 SEO and social metadata
config/
  project-overrides.ts       manual project curation
data/
  github-repositories.json   normalized public GitHub metadata cache
scripts/
  fetch-github.mjs           metadata importer
public/
  og-image.svg               social preview
.github/workflows/
  deploy.yml                 GitHub Pages deployment
  refresh-github-data.yml    weekly metadata refresh
```

## Local development

Requirements: Node.js 22 or newer and npm.

```bash
npm ci
npm run dev
```

Useful checks:

```bash
npm run lint
npm run typecheck
npm run build:pages
```

The GitHub Pages production files are written to `out/`. To inspect the static
export locally, serve that directory with any static file server.

## GitHub repository data

Run:

```bash
npm run refresh:github
```

The importer:

1. fetches all public repositories for `bartek-filipiuk`;
2. normalizes only the fields the portfolio needs;
3. writes `data/github-repositories.json`;
4. ignores the generation timestamp when checking whether content changed.

The browser never calls the GitHub API. In Actions, the importer uses the
automatically provided `GITHUB_TOKEN`, avoiding the low anonymous rate limit
without exposing a token in frontend code.

The weekly refresh workflow commits only when repository content actually
changed, so it does not create meaningless scheduled commits. That commit then
triggers the normal Pages deployment.

## Curating projects

Edit `config/project-overrides.ts`.

Each repository can be:

- included or excluded;
- marked as featured;
- ordered;
- assigned a category and status;
- given a careful description;
- connected to a live URL or image;
- labelled as an experiment.

Repository metadata is factual input. Editorial copy should remain conservative
and should never claim behavior that cannot be confirmed in the repository.

To add a screenshot, place an optimized WebP or AVIF file under
`public/projects/` and set its path in the corresponding override:

```ts
"my-project": {
  featured: true,
  order: 7,
  image: "/projects/my-project.webp",
}
```

## GitHub Pages deployment

The deployment workflow runs on:

- every push to `main`;
- manual `workflow_dispatch`.

It installs locked dependencies, refreshes public metadata, builds a static
export, uploads the `out/` artifact and deploys it with the official GitHub
Pages action.

Repository settings required:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Ensure Actions are enabled for the repository.
4. Push to `main` or start **Deploy portfolio to GitHub Pages** manually.

Because this is the user-level repository
`bartek-filipiuk/bartek-filipiuk.github.io`, the site is built for `/` and does
not need a repository base path.

## Custom domain later

The initial canonical URL is `https://bartek-filipiuk.github.io`.

To move to `portfolio.devince.dev` later:

1. add the custom domain in **Settings → Pages**;
2. create the DNS record GitHub shows (normally a CNAME);
3. wait for DNS verification and enable HTTPS;
4. update `metadataBase`, canonical URLs, sitemap and robots entries;
5. add a `public/CNAME` file containing `portfolio.devince.dev`.

Do not add `CNAME` before the DNS and Pages settings are ready.

## Design and accessibility

The interface uses semantic sections, a skip link, visible focus states, a
keyboard-accessible mobile menu, descriptive external links and color-independent
labels. Motion is subtle and disabled through `prefers-reduced-motion`.

The default experience is dark, typography-led and intentionally restrained:
system grids and status panels are references to architecture work, not a
terminal parody.
