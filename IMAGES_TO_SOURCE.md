# Images to source

A shopping list for photos the site needs. For each one: the exact filename to
save it as, where it goes, and what to look for. Drop finished files straight
into `public/images/` using these names and say so, I'll wire each one into
the right place myself.

## Done

- `book-before.jpg` / `book-after.jpg`, wired as the before/after pair on `/book`.
- `404-page-not-found.jpg`, wired on the new custom 404 page (`/en/not-found.tsx`
  plus a catch-all route so broken links actually hit it).
- `blog-accessibility-eaa-guide.jpg`, wired as the EAA guide's feature image.
  The "does this apply to you" scope section is now a two-column comparison
  card instead of two bullet lists.
- `blog-diy-website-legal.jpg`, wired as the DIY legal post's feature image.
  The Quick DIY Legal Checklist is now an icon-based grid instead of a bullet
  list.
- `blog-web-accessibility-ireland.jpg`, wired as the WCAG guide's feature
  image. The "roughly 1 in 6 people" stat is now an icon-grid visual instead
  of a sentence.
- `blog-website-helping-business-grow.jpg`, wired as that post's feature
  image. The warning-signs list is now an icon-based card grid, same
  red-flag pattern as the EAA guide's compliance cards.
- `blog-website-works-for-users.jpg`, wired as that post's feature image.
  The 5 UX essentials list is now an icon-based card grid.
- `blog-business-problem-to-solution.jpg`, wired as that post's feature
  image. The 4 problem-signal patterns are now an icon-based card grid.
- `blog-expense-tracking-sole-traders.jpg`, wired as that post's feature
  image. The tool comparison was already a proper table, so no extra
  generated visual was needed there.
- `blog-validate-idea-design-thinking.jpg` was skipped, the Value Proposition
  Canvas is now a generated Venn diagram instead, no photo needed there.
- `blog-irish-grants-app-development.jpg` was skipped, the grants comparison
  is now a generated bar chart instead.
- Two extra photos arrived without matching my suggested filenames, wired by
  reading what they show: `don't-quit-do-it.jpg` (a monitor reading "Don't
  Quit" above a design mockup) went on "Have an idea worth building?", and
  `start-up-make-mistakes-faster.jpg` (sticky notes reading "Start Up" and
  "Make Mistakes Faster") went on "Got an idea that needs to become a real
  product?".

All wired images were resized and recompressed before going in (max 1600px
on the long edge, quality 78 mozjpeg), cutting each file by roughly 20 to 40x
with no visible quality loss.

## Still open

Style note that applies to everything below: the photos already on `/about`
(the handshake photo aside) read as genuine because they're actual phone
photos, not polished stock. The two photos currently on `/book`
(`frustrated-developer.jpg`, `technical-consultation-call.jpg`) are the
opposite, generic stock photography of people who don't appear anywhere else
on the site. Where possible, favour a real, slightly imperfect photo over a
polished one, it'll read as more trustworthy and fits the humour angle better
too.

---

### `blog-digital-presence-that-works.jpg`
**Post:** Need a better digital presence that actually works?
**Look for:** a small business's presence spread across devices at once,
phone showing a Google listing, laptop showing the website, side by side.
**I'll also build:** a simple presence checklist (site, listing, social,
reviews) as one compact visual.
