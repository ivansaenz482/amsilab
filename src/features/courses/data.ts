import {
  Activity,
  Bot,
  Cpu,
  Gauge,
  Network,
  RadioTower,
} from "lucide-react";
import type { Course, CourseSchedule } from "./types";

export const courses: Course[] = [
  {
    slug: "fundamentos-de-plc-industrial",
    code: "AMSI / 01",
    category: "AUTOMATIZACIÓN",
    title: "Fundamentos de PLC industrial",
    summary:
      "Programación, diagnóstico y puesta en marcha de controladores lógicos programables.",
    description:
      "Programa introductorio al mundo de los controladores lógicos programables. Se trabaja desde la lógica de control y el cableado de señales hasta la programación estructurada, el diagnóstico de fallas y la puesta en marcha de una celda automatizada.",
    level: "Inicial",
    hours: 40,
    modalities: ["Presencial", "A medida"],
    icon: Cpu,
    audience: [
      "Técnicos de mantenimiento e instrumentación",
      "Estudiantes de carreras técnicas y de ingeniería",
      "Operadores que participan en proyectos de automatización",
    ],
    outcomes: [
      "Interpretar lógica de control y diagramas eléctricos",
      "Programar bloques básicos y estructuras de control",
      "Configurar entradas y salidas digitales y analógicas",
      "Diagnosticar fallas y realizar puesta en marcha",
    ],
    includes: [
      "Certificado de aprobación",
      "Material técnico digital",
      "Práctica sobre equipos de laboratorio",
      "Acompañamiento durante el programa",
    ],
    modules: [
      {
        title: "Introducción al control industrial",
        topics: [
          "Arquitectura de un PLC",
          "Ciclo de scan y direccionamiento",
          "Señales digitales y analógicas",
        ],
      },
      {
        title: "Programación básica",
        topics: [
          "Contactos, bobinas y enclavamientos",
          "Temporizadores y contadores",
          "Funciones de comparación y aritmética",
        ],
      },
      {
        title: "HMI y diagnóstico",
        topics: [
          "Integración con pantallas de operador",
          "Monitoreo de variables y alarmas",
          "Métodos de diagnóstico de fallas",
        ],
      },
    ],
    schedules: [
      {
        label: "Grupo de tarde",
        startDate: "2026-11-09",
        endDate: "2026-12-04",
        modality: "Presencial",
        time: "Lunes y miércoles · 18:00 a 21:00",
        seats: 14,
      },
      {
        label: "Grupo intensivo",
        startDate: "2027-01-11",
        endDate: "2027-02-05",
        modality: "Presencial",
        time: "Lunes a viernes · 08:00 a 12:00",
        seats: 10,
      },
    ],
    investment: {
      usd: 340,
      unit: "por participante",
      note: "Incluye material y práctica en laboratorio.",
    },
  },
  {
    slug: "scada-y-hmi",
    code: "AMSI / 02",
    category: "SUPERVISIÓN",
    title: "Introducción a SCADA y HMI",
    summary:
      "Supervisión industrial, alarmas, visualización y control de procesos.",
    description:
      "Formación enfocada en la capa de supervisión: cómo se construyen interfaces de operador claras, cómo se gestionan alarmas y tendencias, y cómo un sistema SCADA permite tomar decisiones sobre el proceso en tiempo real.",
    level: "Inicial",
    hours: 36,
    modalities: ["Presencial", "En línea"],
    icon: Gauge,
    audience: [
      "Técnicos y operadores de sala de control",
      "Analistas de procesos y producción",
      "Integradores que inician en supervisión",
    ],
    outcomes: [
      "Diseñar pantallas de operador funcionales",
      "Configurar alarmas, históricos y tendencias",
      "Comunicar HMI y SCADA con el controlador",
      "Interpretar información para mejorar el proceso",
    ],
    includes: [
      "Certificado de aprobación",
      "Material técnico digital",
      "Proyecto de supervisión guiado",
      "Grabación de las sesiones en línea",
    ],
    modules: [
      {
        title: "Fundamentos de supervisión",
        topics: [
          "Arquitectura SCADA y HMI",
          "Roles de operación y mantenimiento",
          "Buenas prácticas de visualización",
        ],
      },
      {
        title: "Diseño de interfaces",
        topics: [
          "Jerarquía de pantallas",
          "Objetos y animaciones",
          "Navegación y usabilidad",
        ],
      },
      {
        title: "Alarmas e históricos",
        topics: [
          "Configuración de alarmas",
          "Registro de datos y tendencias",
          "Reportes de proceso",
        ],
      },
    ],
    schedules: [
      {
        label: "Grupo de tarde",
        startDate: "2026-11-16",
        endDate: "2026-12-11",
        modality: "Presencial",
        time: "Martes y jueves · 18:30 a 21:30",
        seats: 16,
      },
      {
        label: "Grupo en línea",
        startDate: "2027-02-08",
        endDate: "2027-03-05",
        modality: "En línea",
        time: "Martes y jueves · 19:00 a 22:00",
        seats: 20,
      },
    ],
    investment: {
      usd: 300,
      unit: "por participante",
      note: "Modalidad en línea: 280 USD por participante.",
    },
  },
  {
    slug: "redes-industriales-e-industria-4-0",
    code: "AMSI / 03",
    category: "TECNOLOGÍA",
    title: "Redes industriales e Industria 4.0",
    summary:
      "Comunicaciones industriales, IIoT e integración de sistemas de planta.",
    description:
      "Programa dedicado a las comunicaciones que sostienen la fábrica conectada: protocolos industriales, segmentación de redes, integración de equipos y los conceptos base de IIoT y analítica de datos de planta.",
    level: "Intermedio",
    hours: 40,
    modalities: ["Presencial", "En línea", "A medida"],
    icon: Network,
    audience: [
      "Técnicos e ingenieros de automatización",
      "Responsables de mantenimiento y TI industrial",
      "Profesionales que integran equipos de distintas marcas",
    ],
    outcomes: [
      "Entender protocolos industriales habituales",
      "Estructurar y documentar una red de planta",
      "Integrar equipos y diagnosticar comunicaciones",
      "Aplicar conceptos de IIoT y datos de proceso",
    ],
    includes: [
      "Certificado de aprobación",
      "Material técnico digital",
      "Ejercicios de integración entre equipos",
      "Guía de buenas prácticas de red",
    ],
    modules: [
      {
        title: "Fundamentos de redes industriales",
        topics: [
          "Topologías y medios",
          "Direccionamiento y segmentación",
          "Conceptos de ciberseguridad industrial",
        ],
      },
      {
        title: "Protocolos industriales",
        topics: [
          "Protocolos de campo y de supervisión",
          "Mapeo de variables entre equipos",
          "Herramientas de diagnóstico",
        ],
      },
      {
        title: "Industria 4.0",
        topics: [
          "Arquitecturas IIoT",
          "Recolección y visualización de datos",
          "Casos de aplicación en planta",
        ],
      },
    ],
    schedules: [
      {
        label: "Grupo de sábados",
        startDate: "2026-11-23",
        endDate: "2026-12-19",
        modality: "Presencial",
        time: "Sábados · 08:00 a 13:00",
        seats: 12,
      },
      {
        label: "Grupo en línea",
        startDate: "2027-01-18",
        endDate: "2027-02-12",
        modality: "En línea",
        time: "Lunes y miércoles · 19:00 a 22:00",
        seats: 18,
      },
    ],
    investment: {
      usd: 380,
      unit: "por participante",
      note: "Incluye prácticas de integración con equipos de laboratorio.",
    },
  },
  {
    slug: "instrumentacion-y-calibracion",
    code: "AMSI / 04",
    category: "INSTRUMENTACIÓN",
    title: "Instrumentación y calibración",
    summary:
      "Sensores, transmisores, lazos de medición y verificación metrológica.",
    description:
      "Formación práctica sobre la medición industrial: tipos de sensores, configuración de transmisores, lazos de corriente, verificación y calibración de instrumentos para garantizar mediciones confiables.",
    level: "Inicial",
    hours: 32,
    modalities: ["Presencial", "A medida"],
    icon: RadioTower,
    audience: [
      "Técnicos de instrumentación y metrología",
      "Personal de mantenimiento de procesos",
      "Estudiantes de áreas técnicas afines",
    ],
    outcomes: [
      "Seleccionar instrumentos según la aplicación",
      "Cablear y configurar lazos de medición",
      "Realizar verificación y calibración básica",
      "Documentar resultados y trazabilidad",
    ],
    includes: [
      "Certificado de aprobación",
      "Material técnico digital",
      "Práctica con patrones de calibración",
      "Formatos de registro y trazabilidad",
    ],
    modules: [
      {
        title: "Medición de variables",
        topics: [
          "Presión, temperatura, nivel y caudal",
          "Sensores y transmisores",
          "Rangos, exactitud y repetibilidad",
        ],
      },
      {
        title: "Lazos de señal",
        topics: [
          "Lazos de corriente de 4 a 20 mA",
          "Alimentación y borneras",
          "Diagnóstico de señales anómalas",
        ],
      },
      {
        title: "Calibración",
        topics: [
          "Patrones y criterios de calibración",
          "Procedimientos de verificación",
          "Registros y trazabilidad",
        ],
      },
    ],
    schedules: [
      {
        label: "Grupo de tarde",
        startDate: "2026-12-07",
        endDate: "2026-12-23",
        modality: "Presencial",
        time: "Lunes a jueves · 18:00 a 21:00",
        seats: 14,
      },
      {
        label: "Grupo de febrero",
        startDate: "2027-02-15",
        endDate: "2027-03-03",
        modality: "Presencial",
        time: "Lunes a jueves · 18:00 a 21:00",
        seats: 14,
      },
    ],
    investment: {
      usd: 280,
      unit: "por participante",
      note: "Incluye uso de patrones y banco de calibración.",
    },
  },
  {
    slug: "robotica-industrial",
    code: "AMSI / 05",
    category: "ROBÓTICA",
    title: "Robótica industrial aplicada",
    summary:
      "Programación de robots, trayectorias, seguridad y celdas robotizadas.",
    description:
      "Programa orientado a la operación y programación básica de celdas robotizadas: tipos de robots, sistemas de coordenadas, programación de trayectorias, herramientas y criterios de seguridad.",
    level: "Intermedio",
    hours: 40,
    modalities: ["Presencial", "A medida"],
    icon: Bot,
    audience: [
      "Técnicos de mantenimiento y producción",
      "Integradores de celdas robotizadas",
      "Ingenieros de procesos con robots en planta",
    ],
    outcomes: [
      "Identificar componentes y ejes de un robot",
      "Programar movimientos y trayectorias",
      "Configurar herramientas y marcos de referencia",
      "Aplicar criterios básicos de seguridad",
    ],
    includes: [
      "Certificado de aprobación",
      "Material técnico digital",
      "Práctica de programación en celda didáctica",
      "Checklist de seguridad de celda",
    ],
    modules: [
      {
        title: "Fundamentos de robótica",
        topics: [
          "Tipos de robots y grados de libertad",
          "Sistemas de coordenadas",
          "Ejes, frenos y actuadores",
        ],
      },
      {
        title: "Programación",
        topics: [
          "Movimientos punto a punto y lineales",
          "Trayectorias y velocidades",
          "Herramientas y frames",
        ],
      },
      {
        title: "Seguridad y operación",
        topics: [
          "Zonas y enclavamientos de seguridad",
          "Elementos de protección de celda",
          "Operación y recuperación de fallas",
        ],
      },
    ],
    schedules: [
      {
        label: "Grupo de enero",
        startDate: "2027-01-12",
        endDate: "2027-02-06",
        modality: "Presencial",
        time: "Martes y jueves · 18:00 a 21:00",
        seats: 10,
      },
      {
        label: "Grupo de marzo",
        startDate: "2027-03-09",
        endDate: "2027-04-03",
        modality: "Presencial",
        time: "Martes y jueves · 18:00 a 21:00",
        seats: 10,
      },
    ],
    investment: {
      usd: 420,
      unit: "por participante",
      note: "Cupos limitados por el número de estaciones de práctica.",
    },
  },
  {
    slug: "variadores-y-motion-control",
    code: "AMSI / 06",
    category: "ACCIONAMIENTOS",
    title: "Variadores de frecuencia y motion control",
    summary:
      "Control de motores, accionamientos eléctricos y posicionamiento.",
    description:
      "Formación técnica sobre accionamientos eléctricos: configuración y parametrización de variadores de frecuencia, control de velocidad, rampas y fundamentos de movimiento y posicionamiento.",
    level: "Intermedio",
    hours: 36,
    modalities: ["Presencial", "En línea"],
    icon: Activity,
    audience: [
      "Técnicos de mantenimiento eléctrico",
      "Personal de automatización y procesos",
      "Estudiantes de control industrial",
    ],
    outcomes: [
      "Configurar un variador de frecuencia",
      "Ajustar rampas, límites y protecciones",
      "Comprender esquemas de control de velocidad",
      "Introducirse en movimiento y posicionamiento",
    ],
    includes: [
      "Certificado de aprobación",
      "Material técnico digital",
      "Práctica de parametrización en banco de motores",
      "Guía de protecciones y alarmas",
    ],
    modules: [
      {
        title: "Motores y accionamientos",
        topics: [
          "Fundamentos de motores de inducción",
          "Arranque directo y arranque controlado",
          "Conceptos de torque y velocidad",
        ],
      },
      {
        title: "Variadores de frecuencia",
        topics: [
          "Cableado y entradas de control",
          "Parametrización y rampas",
          "Protecciones y alarmas",
        ],
      },
      {
        title: "Motion control",
        topics: [
          "Control de posición y encoders",
          "Conceptos de servocontrol",
          "Aplicaciones de posicionamiento",
        ],
      },
    ],
    schedules: [
      {
        label: "Grupo de tarde",
        startDate: "2026-11-30",
        endDate: "2026-12-22",
        modality: "Presencial",
        time: "Lunes y miércoles · 18:30 a 21:30",
        seats: 12,
      },
      {
        label: "Grupo en línea",
        startDate: "2027-02-01",
        endDate: "2027-02-24",
        modality: "En línea",
        time: "Lunes y miércoles · 19:00 a 22:00",
        seats: 20,
      },
    ],
    investment: {
      usd: 310,
      unit: "por participante",
      note: "Incluye práctica con banco de motores y variadores.",
    },
  },
];

const MONTHS = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getCourseSlugs(): string[] {
  return courses.map((course) => course.slug);
}

export function formatDuration(hours: number): string {
  return `${hours} horas`;
}

export function formatDateLabel(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  const monthName = MONTHS[Number(month) - 1] ?? month;

  return `${day} ${monthName} ${year}`;
}

export function formatDateRange(startDate: string, endDate?: string): string {
  if (!endDate) {
    return formatDateLabel(startDate);
  }

  const [startYear] = startDate.split("-");
  const [endYear, endMonth, endDay] = endDate.split("-");
  const endLabel =
    startYear === endYear
      ? `${endDay} ${MONTHS[Number(endMonth) - 1] ?? endMonth}`
      : formatDateLabel(endDate);

  return `${formatDateLabel(startDate)} al ${endLabel}`;
}

export function getSchedules(course: Course): CourseSchedule[] {
  return [...course.schedules].sort((a, b) =>
    a.startDate.localeCompare(b.startDate),
  );
}

export function getNextSchedule(course: Course): CourseSchedule | undefined {
  return getSchedules(course)[0];
}

export function formatInvestment(course: Course): string {
  if (!course.investment) {
    return "Cotización a medida";
  }

  return `USD ${course.investment.usd} ${course.investment.unit}`;
}

export const catalogNote =
  "Programas, fechas y valores referenciales de ejemplo. La disponibilidad y la inversión final se confirman en la propuesta comercial.";
