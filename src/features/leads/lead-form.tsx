"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import {
  leadInterestLabels,
  leadInterests,
  leadSchema,
  type LeadInput,
} from "@/schemas/lead";

type LeadFormProps = {
  defaultInterest?: LeadInput["interest"];
  courseSlug?: string;
  courseTitle?: string;
  submitLabel?: string;
};

export function LeadForm({
  defaultInterest = "otro",
  courseSlug,
  courseTitle,
  submitLabel = "Enviar solicitud",
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      role: "",
      interest: defaultInterest,
      courseSlug: courseSlug ?? "",
      message: "",
      consent: false,
      website: "",
    },
  });

  async function onSubmit(values: LeadInput) {
    setServerError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !data?.ok) {
        setServerError(
          data?.error ?? "No pudimos enviar tu solicitud. Inténtalo de nuevo.",
        );
        setStatus("error");
        return;
      }

      reset({
        name: "",
        email: "",
        phone: "",
        company: "",
        role: "",
        interest: defaultInterest,
        courseSlug: courseSlug ?? "",
        message: "",
        consent: false,
        website: "",
      });
      setStatus("ok");
    } catch {
      setServerError(
        "Sin conexión con el servidor. Revisa tu red e inténtalo otra vez.",
      );
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={30} strokeWidth={1.6} />
        <h3>Solicitud recibida</h3>
        <p>
          Gracias por escribirnos. Revisaremos tu mensaje y te contactaremos
          con la información que necesitas.
        </p>
        <button
          type="button"
          className="button-secondary"
          onClick={() => setStatus("idle")}
        >
          <RotateCcw size={16} /> Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {courseTitle ? (
        <p className="form-context">
          Consulta sobre <strong>{courseTitle}</strong>
        </p>
      ) : null}

      <div className="form-grid">
        <div className="field">
          <label htmlFor="lead-name">Nombre y apellido *</label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            placeholder="Ej. Ana Torres"
            aria-invalid={errors.name ? "true" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <span className="field-error" role="alert">
              {errors.name.message}
            </span>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="lead-email">Correo electrónico *</label>
          <input
            id="lead-email"
            type="email"
            autoComplete="email"
            placeholder="nombre@empresa.com"
            aria-invalid={errors.email ? "true" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <span className="field-error" role="alert">
              {errors.email.message}
            </span>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="lead-phone">Teléfono</label>
          <input
            id="lead-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+593 ..."
            aria-invalid={errors.phone ? "true" : undefined}
            {...register("phone")}
          />
          {errors.phone ? (
            <span className="field-error" role="alert">
              {errors.phone.message}
            </span>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="lead-company">Empresa u organización</label>
          <input
            id="lead-company"
            type="text"
            autoComplete="organization"
            placeholder="Opcional"
            {...register("company")}
          />
          {errors.company ? (
            <span className="field-error" role="alert">
              {errors.company.message}
            </span>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="lead-role">Cargo</label>
          <input
            id="lead-role"
            type="text"
            autoComplete="organization-title"
            placeholder="Opcional"
            {...register("role")}
          />
          {errors.role ? (
            <span className="field-error" role="alert">
              {errors.role.message}
            </span>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="lead-interest">Tipo de solicitud *</label>
          <select
            id="lead-interest"
            aria-invalid={errors.interest ? "true" : undefined}
            {...register("interest")}
          >
            {leadInterests.map((interest) => (
              <option key={interest} value={interest}>
                {leadInterestLabels[interest]}
              </option>
            ))}
          </select>
          {errors.interest ? (
            <span className="field-error" role="alert">
              {errors.interest.message}
            </span>
          ) : null}
        </div>
      </div>

      <div className="field">
        <label htmlFor="lead-message">Mensaje *</label>
        <textarea
          id="lead-message"
          rows={5}
          placeholder="Cuéntanos qué necesitas aprender o qué competencias quieres desarrollar."
          aria-invalid={errors.message ? "true" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <span className="field-error" role="alert">
            {errors.message.message}
          </span>
        ) : null}
      </div>

      <div className="field field-honeypot" aria-hidden="true">
        <label htmlFor="lead-website">No completar este campo</label>
        <input
          id="lead-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <label className="checkbox">
        <input type="checkbox" {...register("consent")} />
        <span>
          Autorizo a AMSILAB a usar mis datos para responder esta solicitud.
        </span>
      </label>
      {errors.consent ? (
        <span className="field-error" role="alert">
          {errors.consent.message}
        </span>
      ) : null}

      {serverError ? (
        <p className="form-error" role="alert">
          {serverError}
        </p>
      ) : null}

      <div className="form-actions">
        <button
          type="submit"
          className="button-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="spin" /> Enviando
            </>
          ) : (
            <>
              {submitLabel} <ArrowRight size={18} />
            </>
          )}
        </button>
        <span className="form-hint">
          Responderemos a la brevedad. Sin compromiso.
        </span>
      </div>
    </form>
  );
}
