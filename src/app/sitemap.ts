import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { getCourseSlugs } from "@/features/courses/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string;
    priority: number;
  }> = [
    { path: "", priority: 1 },
    { path: "/cursos", priority: 0.9 },
    { path: "/talleres", priority: 0.8 },
    { path: "/seminarios", priority: 0.8 },
    { path: "/empresas", priority: 0.8 },
    { path: "/servicios", priority: 0.7 },
    { path: "/recursos", priority: 0.6 },
    { path: "/contacto", priority: 0.9 },
  ];

  const courseRoutes = getCourseSlugs().map((slug) => ({
    path: `/cursos/${slug}`,
    priority: 0.7,
  }));

  return [...routes, ...courseRoutes].map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
