"""Crawl sitemap and initial HTML, without third-party packages or authentication.
Usage: python3 scripts/audit-seo.py BASE_URL OUTPUT_JSON
Canonical URLs remain production URLs when transport is a local server.
"""
import concurrent.futures
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

CANONICAL = "https://archpignataro.it"


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.locale = None
        self.title = ""
        self.in_title = False
        self.meta = {}
        self.canonical = None
        self.alternates = {}
        self.links = []
        self.headings = []
        self.jsonld = []
        self.ld = None
        self.missing_alt = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.locale = attrs.get("lang")
        if tag == "title":
            self.in_title = True
        if tag == "meta":
            self.meta[attrs.get("name", attrs.get("property"))] = attrs.get("content")
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href")
        if tag == "link" and attrs.get("rel") == "alternate":
            self.alternates[attrs.get("hreflang")] = attrs.get("href")
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag == "h1":
            self.headings.append(tag)
        if tag == "img" and "alt" not in attrs:
            self.missing_alt += 1
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.ld = ""

    def handle_data(self, value):
        if self.in_title:
            self.title += value
        if self.ld is not None:
            self.ld += value

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag == "script" and self.ld is not None:
            self.jsonld.append(json.loads(self.ld))
            self.ld = None


def fetch(url, method="GET"):
    req = urllib.request.Request(url, method=method, headers={"User-Agent": "StudioPignataro-SEO-Audit/1.0"})
    with urllib.request.urlopen(req, timeout=25) as response:
        return response.status, response.url, {key.lower(): value for key, value in response.headers.items()}, response.read().decode() if method == "GET" else ""


def run(base, output):
    base = base.rstrip("/")
    _, _, _, xml = fetch(base + "/sitemap.xml")
    tree = ET.fromstring(xml)
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9", "i": "http://www.google.com/schemas/sitemap-image/1.1"}
    urls = [x.text for x in tree.findall("s:url/s:loc", ns)]
    images = sorted({x.text for x in tree.findall("s:url/i:image/i:loc", ns)})

    def transport(url):
        parsed = urllib.parse.urlsplit(url)
        return base + parsed.path + ("?" + parsed.query if parsed.query else "")

    def page(url):
        try:
            status, final, headers, html = fetch(transport(url))
            p = Page()
            p.feed(html)
            issues = []
            if not p.title.strip(): issues.append("missing-title")
            if not p.meta.get("description"): issues.append("missing-description")
            if (p.canonical or "").rstrip("/") != url.rstrip("/"): issues.append("canonical-mismatch")
            if not {"it", "en", "x-default"}.issubset(p.alternates): issues.append("incomplete-hreflang")
            if not p.jsonld: issues.append("jsonld-not-in-initial-html")
            if p.missing_alt: issues.append("images-without-alt")
            if "noindex" in ((p.meta.get("robots") or "") + headers.get("x-robots-tag", "")): issues.append("noindex")
            return {"url": url, "status": status, "title": p.title, "locale": p.locale, "description": p.meta.get("description"), "canonical": p.canonical, "jsonld_count": len(p.jsonld), "h1_count": len(p.headings), "internal_links": sorted({urllib.parse.urljoin(url, link).split("#")[0] for link in p.links if urllib.parse.urljoin(url, link).startswith(CANONICAL + "/")}), "issues": issues}
        except Exception as error:
            return {"url": url, "issues": [str(error)]}

    def image(url):
        try:
            status, _, _, _ = fetch(transport(url), "HEAD")
            return None if status == 200 else {"url": url, "status": status}
        except Exception as error:
            return {"url": url, "error": str(error)}

    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        pages = list(pool.map(page, urls))
        failed_images = [v for v in pool.map(image, images) if v]
    titles = [(p.get("locale"), p["title"]) for p in pages if p.get("title")]
    report = {"base": base, "url_count": len(urls), "image_count": len(images), "duplicate_titles": sorted({v for v in titles if titles.count(v) > 1}), "pages_with_issues": sum(bool(p["issues"]) for p in pages), "failed_images": failed_images, "pages": pages}
    Path(output).write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({k: v for k, v in report.items() if k != "pages"}, ensure_ascii=False))


if __name__ == "__main__":
    run(sys.argv[1], sys.argv[2])
