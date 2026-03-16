// datos.js — Módulo de datos compartido para KONECTO

// Usuarios de ejemplo (miembros del grupo)
export const usuarios = [
  {
    nombre: "Nadir Neme Rodríguez",
    email: "nadir@konecto.com",
    password: "nadir123"
  },
  {
    nombre: "Ana Patricia Calabuig Ruzafa",
    email: "ana@konecto.com",
    password: "ana123"
  },
  {
    nombre: "Albert Lopez Pajuelo",
    email: "albert@konecto.com",
    password: "albert123"
  },
  {
    nombre: "Samuel Hernandez Martin",
    email: "samuel@konecto.com",
    password: "samuel123"
  }
];

// Empleos: ofertas y demandas en un solo array, filtrable por "tipo"
export const empleos = [
  // Ofertas (empresas que buscan trabajadores)
  {
    titulo: "Desarrollador Frontend Junior",
    descripcion: "Buscamos desarrollador con conocimientos de HTML, CSS y JavaScript para equipo web.",
    jornada: "Completa",
    sueldo: 22000,
    tipo: "oferta"
  },
  {
    titulo: "Diseñadora UX/UI",
    descripcion: "Se necesita diseñadora con experiencia en Figma y prototipado de interfaces móviles.",
    jornada: "Completa",
    sueldo: 28000,
    tipo: "oferta"
  },
  {
    titulo: "Técnico de Soporte IT",
    descripcion: "Soporte técnico nivel 1 para incidencias de hardware y software en oficina central.",
    jornada: "Parcial",
    sueldo: 15000,
    tipo: "oferta"
  },

  // Demandas (personas que buscan empleo)
  {
    titulo: "Administrativo con inglés",
    descripcion: "Busco empleo de administrativo. Nivel B2 de inglés y manejo avanzado de Excel.",
    jornada: "Completa",
    sueldo: 20000,
    tipo: "demanda"
  },
  {
    titulo: "Community Manager freelance",
    descripcion: "Gestiono redes sociales, creación de contenido y analítica. Disponibilidad inmediata.",
    jornada: "Parcial",
    sueldo: 12000,
    tipo: "demanda"
  }
];
