const fs = require("fs");
const path = require("path");

const generateSitemap = () => {
  const baseUrl = "https://archpignataro.it";
  const pages = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/projects", changefreq: "weekly", priority: 0.7 },
    { url: "/presses", changefreq: "weekly", priority: 0.7 },
    { url: "/bio", changefreq: "weekly", priority: 0.7 },
    { url: "/contacts", changefreq: "weekly", priority: 0.7 },
  ];

  const currentDate = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        (page) => `
      <url>
        <loc>${baseUrl}${page.url}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  return xml;
};

const sitemap = generateSitemap();

// Scrivo il sitemap su disco
const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
fs.writeFileSync(sitemapPath, sitemap);

console.log("Sitemap generato con successo!");
