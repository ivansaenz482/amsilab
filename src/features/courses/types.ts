import type { LucideIcon } from "lucide-react";

export type CourseLevel = "Inicial" | "Intermedio" | "Avanzado";

export type CourseModality = "Presencial" | "En línea" | "A medida";

export type CourseModule = {
  title: string;
  topics: string[];
};

export type CourseSchedule = {
  label: string;
  startDate: string;
  endDate?: string;
  modality: CourseModality;
  time: string;
  seats: number;
};

export type CourseInvestment = {
  usd: number;
  unit: string;
  note?: string;
};

export type Course = {
  slug: string;
  code: string;
  category: string;
  title: string;
  summary: string;
  description: string;
  level: CourseLevel;
  hours: number;
  modalities: CourseModality[];
  icon: LucideIcon;
  audience: string[];
  outcomes: string[];
  includes: string[];
  modules: CourseModule[];
  schedules: CourseSchedule[];
  investment: CourseInvestment | null;
};
