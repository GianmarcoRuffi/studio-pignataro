const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const baseUrl = process.env.SITE_URL || "https://archpignataro.it";
const appDir = path.join(__dirname, "src", "app");
const dataFile = path.join(__dirname, "src", "data", "data.ts");

const priorityByPath = {
  "/": 1.0,
  "/projects": 0.8,
  "/presses": 0.75,
  "/bio": 0.7,
  "/contacts": 0.7,
};

const changefreqByPath = {
  "/": "daily",
  "/projects": "weekly",
  "/presses": "weekly",
};

const toIsoDate = (filePath) => {
  try {
    return fs.statSync(filePath).mtime.toISOString();
  } catch (error) {
    return new Date().toISOString();
  }
};

const collectStaticPages = () => {
  const pages = [];

  const rootPage = path.join(appDir, "page.tsx");
  if (fs.existsSync(rootPage)) {
    pages.push({
      url: "/",
      lastmod: toIsoDate(rootPage),
    });
  }

  const entries = fs.readdirSync(appDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const pageFile = path.join(appDir, entry.name, "page.tsx");
    if (!fs.existsSync(pageFile)) continue;

    const url = `/${entry.name}`;
    pages.push({
      url,
      lastmod: toIsoDate(pageFile),
    });
  }

  return pages;
};

const collectProjectSlugs = () => {
  if (!fs.existsSync(dataFile)) return [];

  const source = fs.readFileSync(dataFile, "utf8");
  const tsSource = ts.createSourceFile(
    "data.ts",
    source,
    ts.ScriptTarget.Latest,
    true
  );

  const slugs = new Set();
  const visit = (node) => {
    if (
      ts.isPropertyAssignment(node) &&
      node.name.getText(tsSource) === "slug" &&
      ts.isStringLiteral(node.initializer)
    ) {
      slugs.add(node.initializer.text);
    }
    ts.forEachChild(node, visit);
  };

  visit(tsSource);
  return Array.from(slugs);
};

const buildUrls = () => {
  const staticPages = collectStaticPages();
  const projectSlugs = collectProjectSlugs();

  const projectLastmod = toIsoDate(dataFile);
  const projectPages = projectSlugs.map((slug) => ({
    url: `/projects/${slug}`,
    lastmod: projectLastmod,
    changefreq: "weekly",
    priority: 0.65,
  }));

  return [...staticPages, ...projectPages].map((page) => ({
    ...page,
    changefreq: page.changefreq || changefreqByPath[page.url] || "monthly",
    priority: page.priority || priorityByPath[page.url] || 0.5,
  }));
};

const generateSitemap = () => {
  const urls = buildUrls();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return xml;
};

const sitemap = generateSitemap();
const sitemapPath = path.join(__dirname, "public", "sitemap.xml");

fs.writeFileSync(sitemapPath, sitemap);
console.log(`Sitemap generato con successo in ${sitemapPath}`);
