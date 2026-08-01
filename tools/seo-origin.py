#!/usr/bin/env python3
"""Finish the technical SEO floor once the canonical domain is settled.

Nothing in this repository hard-codes a domain, because which domain is canonical
is still an open decision (firefoxsportsandresorts.com or firefoxsar.com — see
claude/decisions-log.md, open item 14). Shipping a canonical tag that points at
the wrong origin is worse than shipping none, so canonicals, the sitemap, the
robots Sitemap line and the JSON-LD url/image are all deferred to this script.

Run it once, from the repository root, after the domain is decided:

    python3 tools/seo-origin.py https://firefoxsportsandresorts.com

It is idempotent — run it again after adding a page and it re-stamps everything.

URL FORM. Netlify Pretty URLs is ON for this project: /weddings serves the page
without the .html (verified 1 Aug 2026). So the canonical form is extensionless,
and that is what this script writes into the canonicals and the sitemap.

BEFORE trusting that, confirm the redirect direction on the live host:

    curl -sI https://<domain>/weddings.html | head -1     # expect 301
    curl -sI https://<domain>/weddings     | head -1     # expect 200

If .html returns 200 rather than 301, Pretty URLs has been turned off and the
internal links (which still end in .html) are already canonical — pass
--keep-html to write the .html form instead.
"""

import re
import sys
import datetime
from pathlib import Path

PAGES = ["index", "weddings", "corporate", "estate", "sports", "hotel", "contact"]

root = Path(__file__).resolve().parent.parent
args = [a for a in sys.argv[1:] if not a.startswith("--")]
keep_html = "--keep-html" in sys.argv

if len(args) != 1:
    sys.exit(__doc__)

origin = args[0].rstrip("/")
if not origin.startswith("https://"):
    sys.exit("Origin must start with https://")

today = datetime.date.today().isoformat()


def url_for(page: str) -> str:
    if page == "index":
        return origin + "/"
    return f"{origin}/{page}.html" if keep_html else f"{origin}/{page}"


# 1 — self-referencing canonical on every page
for page in PAGES:
    path = root / f"{page}.html"
    html = path.read_text(encoding="utf-8")
    tag = f'<link rel="canonical" href="{url_for(page)}">'
    if 'rel="canonical"' in html:
        html = re.sub(r'<link rel="canonical"[^>]*>', tag, html)
    else:
        html = html.replace("</head>", tag + "\n</head>", 1)
    path.write_text(html, encoding="utf-8")
    print(f"canonical  {page:10s} -> {url_for(page)}")

# 2 — JSON-LD url and image
for page in ("index", "contact"):
    path = root / f"{page}.html"
    html = path.read_text(encoding="utf-8")
    if '"url"' not in html:
        html = html.replace(
            '  "telephone": "+91 96767 16888",',
            f'  "url": "{origin}/",\n'
            f'  "image": "{origin}/assets/img/venue-gardenpath.jpg",\n'
            '  "telephone": "+91 96767 16888",',
            1,
        )
    else:
        html = re.sub(r'"url": "https?://[^"]*"', f'"url": "{origin}/"', html)
        html = re.sub(r'"image": "https?://[^"]*"', f'"image": "{origin}/assets/img/venue-gardenpath.jpg"', html)
    path.write_text(html, encoding="utf-8")
    print(f"json-ld    {page}")

# 3 — sitemap. No <priority> and no <changefreq>: Google ignores both.
#     lastmod is written once here; update it only on a real content change,
#     because bumping it every deploy teaches Google to ignore the field.
entries = "\n".join(
    f"  <url><loc>{url_for(p)}</loc><lastmod>{today}</lastmod></url>" for p in PAGES
)
(root / "sitemap.xml").write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    f"{entries}\n"
    "</urlset>\n",
    encoding="utf-8",
)
print(f"sitemap.xml  {len(PAGES)} urls")

# 4 — robots.txt points at the sitemap
(root / "robots.txt").write_text(
    "User-agent: *\nAllow: /\n\n" f"Sitemap: {origin}/sitemap.xml\n", encoding="utf-8"
)
print("robots.txt")

print(
    "\nDone. Next: verify the domain in Search Console as a domain property, "
    "submit the sitemap, and inspect all seven URLs on day one."
)
