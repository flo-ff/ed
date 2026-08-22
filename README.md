# Skate Gallery — Astro + Decap CMS (Stack A)

Text + images are editable by non-technical people at `/admin`. Every publish auto-deploys.

## How it works (no tech person needed after setup)

1.  Editor goes to `https://YOUR_SITE.netlify.app/admin/`
2.  Logs in (GitHub or Netlify Identity)
3.  Edits Home, Site Settings, or Galleries — drag & drops images
4.  Clicks `Publish` → CMS commits to GitHub → Netlify/Vercel auto-builds → live in ~60s

## 1. Setup (once, 10 min)

### Option 1: Netlify (easiest for non-technical editors — no GitHub account needed for them)

1.  Push this repo to GitHub: `YOUR_GITHUB_USERNAME/skate-gallery`
2.  Netlify → Add new site → Import from Git → select repo
    * Build command: `npm run build`
    * Publish directory: `dist`
3.  Netlify → Site settings → Identity → Enable Identity → Enable Git Gateway
4.  Identity → Invite users → invite editor's email (they set password via email)
5.  In `public/admin/config.yml` change backend to:
    ```yaml
    backend:
      name: git-gateway
      branch: main
    ```
    Commit & push. Done.

### Option 2: GitHub backend (editors need GitHub account)

1.  Push to GitHub
2.  Create OAuth App: GitHub → Settings → Developer settings → OAuth Apps → New
    * Homepage URL: `https://YOUR_SITE.netlify.app`
    * Callback: `https://YOUR_SITE.netlify.app/.netlify/identity/callback` or `https://api.netlify.com/auth/done` if using Netlify OAuth
    * For pure GitHub without Netlify, use a small OAuth proxy (e.g. `netlify-cms-github-oauth-provider`) or just use Decap with `github` + `implicit` flow.
3.  Set `repo: YOUR_GITHUB_USERNAME/skate-gallery` in `public/admin/config.yml`
4.  Deploy to Netlify/Vercel as above (auto-deploy on `git push` is on by default).

### Vercel alternative

Vercel → Import Git repo → Build command `npm run build` → Output `dist` → Deploy. Auto-deploy on git push works same. For CMS auth use GitHub backend.

## 2. Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static build to dist/
```

Admin locally: `http://localhost:4321/admin/` (needs `npx decap-server` for local backend, or just test editing markdown in `src/content/`)

## 3. Where content lives

* `src/content/settings/site.md` — Site title, hero, Instagram, email
* `src/content/pages/home.md` — Homepage text
* `src/content/galleries/*.md` — Each file = one gallery (title, cover, images array)
* `public/uploads/` — Images uploaded via CMS (also committed to Git)

All editable in `/admin` without code.

## 4. Adding image optimization (optional)

For heavy skate shoots, plug in Cloudinary:
* In Decap `config.yml` add `media_library: name: cloudinary` and set cloud name.
* Or keep Git uploads — Netlify + Astro's `<Image>` will optimize.

## 5. What to change next

* `public/admin/config.yml` → set `repo:` and `site_url:`
* `src/styles/global.css` → brand colors (currently `--accent: #ff3b30`)
* Add more collections (e.g. `videos`) by copying `galleries` block in `config.yml` + creating collection in `src/content/config.ts`

---

Built with Astro 4 + Decap CMS 3. Deploy target: Netlify (or Vercel). Static output → super fast gallery.
