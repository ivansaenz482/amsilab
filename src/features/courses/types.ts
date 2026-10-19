import type { LucideIcon } from "lucide-react";

export type CourseLevel = "Inicial" | "Intermedio" | "Avanzado";

export type CourseModality = "Presencial" | "En línea" | "A medida";

export type CourseModule = {
  title: string;
  topics: string[];
};

export type Course = {
  slug: string;
  code: string;
  category: string;
  title: string;
  summary: string;
  description: string;
  level: CourseLevel;
  duration: string;
  modalities: CourseModality[];
  icon: LucideIcon;
  audience: string[];
  outcomes: string[];
  modules: CourseModule[];
};
