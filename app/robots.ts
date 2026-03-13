import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/admin", "/dashboard", "/dashboard/"],
    },
    sitemap: [
      "https://bluebuff.in/sitemap.xml",
      "https://bluebuff.in/sitemap.txt",
    ],

  };
}
