import { z } from "zod";

export const leadInterests = [
  "curso",
  "taller",
  "seminario",
  "empresarial",
  "otro",
] as const;

export type LeadInterest = (typeof leadInterests)[number];

export const leadInterestLabels: Record<LeadInterest, string> = {
  curso: "Curso de formación",
  taller: "Taller práctico",
  seminario: "Seminario técnico",
  empresarial: "Capacitación para empresas",
  otro: "Otro tema",
};

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre completo.")
    .max(120, "El nombre es demasiado largo."),
  email: z
    .string()
    .trim()
    .min(3, "Ingresa tu correo electrónico.")
    .max(160, "El correo es demasiado largo.")
    .email("Ingresa un correo electrónico válido."),
  phone: z
    .string()
    .trim()
    .max(40, "El teléfono es demasiado largo.")
    .regex(
      /^[+()\-\s\d.]{6,}$/,
      "Ingresa un teléfono válido (solo números y símbolos).",
    )
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .trim()
    .max(160, "El nombre de la empresa es demasiado largo.")
    .optional()
    .or(z.literal("")),
  role: z
    .string()
    .trim()
    .max(120, "El cargo es demasiado largo.")
    .optional()
    .or(z.literal("")),
  interest: z.enum(leadInterests, {
    message: "Selecciona el tipo de solicitud.",
  }),
  courseSlug: z
    .string()
    .trim()
    .max(120)
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
    .max(2000, "El mensaje es demasiado largo."),
  consent: z
    .boolean()
    .refine((value) => value === true, {
      message: "Necesitamos tu autorización para contactarte.",
    }),
  website: z
    .string()
    .max(0, "Campo no válido.")
    .optional()
    .or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
