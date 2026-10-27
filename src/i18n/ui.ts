export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const ui = {
  es: {
    siteTitle: 'Senior Flashcards',
    tagline: 'Fundamentos de backend para entrevistas técnicas.',
    backend: 'Backend',
    topics: 'Temas',
    cards: 'tarjetas',
    resources: 'Para profundizar',
    level: { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' },
    switchTo: 'English',
    deck: { all: 'Todos', show: 'Mostrar respuesta', hide: 'Ocultar respuesta', known: 'Lo sé', review: 'Repasar', prev: 'Anterior', next: 'Siguiente', of: 'de', mastered: 'dominadas', empty: 'No hay tarjetas para este nivel.' },
  },
  en: {
    siteTitle: 'Senior Flashcards',
    tagline: 'Backend fundamentals for technical interviews.',
    backend: 'Backend',
    topics: 'Topics',
    cards: 'cards',
    resources: 'Go deeper',
    level: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
    switchTo: 'Español',
    deck: { all: 'All', show: 'Show answer', hide: 'Hide answer', known: 'I know it', review: 'Review again', prev: 'Previous', next: 'Next', of: 'of', mastered: 'mastered', empty: 'No cards for this level.' },
  },
} as const satisfies Record<Locale, unknown>;

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
