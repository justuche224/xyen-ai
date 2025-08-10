import { writeFileSync } from "fs";
import { join } from "path";

// Define the types and functions directly in this file to avoid import issues
interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

function generateSitemap(urls: SitemapUrl[]): string {
  const baseUrl = "https://xyen.pro";

  const urlElements = urls
    .map((url) => {
      const loc = url.loc.startsWith("http") ? url.loc : `${baseUrl}${url.loc}`;
      return `
  <url>
    <loc>${loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
    ${url.priority ? `<priority>${url.priority}</priority>` : ""}
  </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlElements}
</urlset>`;
}

const sitemapUrls: SitemapUrl[] = [
  {
    loc: "/",
    changefreq: "weekly",
    priority: 1.0,
    lastmod: new Date().toISOString(),
  },
  {
    loc: "/dashboard",
    changefreq: "daily",
    priority: 0.9,
  },
  {
    loc: "/dashboard/quizzes",
    changefreq: "daily",
    priority: 0.8,
  },
  {
    loc: "/dashboard/create-quiz",
    changefreq: "weekly",
    priority: 0.7,
  },
  {
    loc: "/dashboard/settings",
    changefreq: "monthly",
    priority: 0.5,
  },
  {
    loc: "/dashboard/account",
    changefreq: "monthly",
    priority: 0.5,
  },
  {
    loc: "/auth/signin",
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    loc: "/auth/signup",
    changefreq: "monthly",
    priority: 0.6,
  },
];

function generateSitemapFile() {
  const sitemap = generateSitemap(sitemapUrls);
  const publicPath = join(process.cwd(), "public");
  const sitemapPath = join(publicPath, "sitemap.xml");

  writeFileSync(sitemapPath, sitemap, "utf-8");
  console.log("✅ Sitemap generated at:", sitemapPath);
}

// Always run when called
generateSitemapFile();
