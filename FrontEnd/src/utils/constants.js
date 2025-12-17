// Configuración de APIs
export const API_CONFIG = {
  baseURL: 'https://etreact-production.up.railway.app',
  endpoints: {
    juegos: '/juegos',
    resenas: '/resenas',
    usuarios: '/usuarios',
    contacto: '/contacto',
    estadisticas: '/estadisticas'
  }
};

// API de RAWG para juegos externos
export const RAWG_API = {
  key: '50db47d9afba40919234625c25b845ee',
  baseURL: 'https://api.rawg.io/api'
};

// Configuración de Supabase (si se usa)
export const SUPABASE_CONFIG = {
  url: 'https://zysjytodswytwmjsyzeh.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5c2p5dG9kc3d5dHdtanN5emVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3Mjg4MjcsImV4cCI6MjA2ODMwNDgyN30.RsPcI-az36-81H7BkqBa1kfLTEIXnfwRp4wsS2oC4dw'
};

// Juegos clásicos locales
export const JUEGOS_CLASICOS = [
  {
    id: 1,
    titulo: "The Legend of Zelda",
    consola: "NES",
    año: 1986,
    imagen: "/assets/covers/zelda.png",
    descripcion: "Explora calabozos, resuelve acertijos y salva a Hyrule en esta joya clásica."
  },
  {
    id: 2,
    titulo: "Super Metroid",
    consola: "SNES",
    año: 1994,
    imagen: "/assets/covers/supermetroid.png",
    descripcion: "Una aventura galáctica intensa con exploración y mejoras progresivas."
  },
  {
    id: 3,
    titulo: "Chrono Trigger",
    consola: "SNES",
    año: 1995,
    imagen: "/assets/covers/chronotrigger.png",
    descripcion: "Viaja por el tiempo y salva el futuro en este legendario RPG."
  }
];

// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  GAME_DETAILS: '/juego/:id',
  CONTACT: '/contacto',
  REGISTER: '/registro'
};

// Mensajes de la aplicación
export const MESSAGES = {
  SUCCESS: {
    REVIEW_CREATED: '¡Reseña enviada exitosamente!',
    USER_CREATED: '¡Usuario creado exitosamente!',
    CONTACT_SENT: '¡Mensaje enviado con éxito!'
  },
  ERROR: {
    GENERIC: 'Ocurrió un error. Por favor, intenta nuevamente.',
    NETWORK: 'Error de conexión. Verifica tu internet.',
    REQUIRED_FIELDS: 'Por favor, completa todos los campos requeridos.',
    INVALID_EMAIL: 'Por favor, ingresa un correo electrónico válido.'
  }
};

// Configuración de validaciones
export const VALIDATION = {
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  PASSWORD_MIN_LENGTH: 6,
  COMMENT_MAX_LENGTH: 1000,
  MESSAGE_MIN_LENGTH: 10
};