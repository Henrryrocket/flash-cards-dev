export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const ui = {
  en: {
    siteTitle: 'Senior Flashcards',
    metaDescription:
      'Flashcards, interactive diagrams and curated resources to master backend fundamentals and ace senior technical interviews.',
    nav: { topics: 'Topics', why: 'Why fundamentals', how: 'How it works' },
    themeToggle: 'Toggle light and dark theme',
    languageLabel: 'Language',
    hero: {
      eyebrow: 'Fundamentals first',
      title: 'Master the fundamentals.',
      titleAccent: 'Ship with confidence.',
      lead: 'AI can write the code. Engineers who understand it are the ones who review it, debug it and design it. Build solid backend foundations with flashcards, interactive diagrams and curated resources.',
      primary: 'Start learning',
      secondary: 'Why it matters',
      stats: { topics: 'topics', cards: 'cards', levels: 'levels' },
      sample: { level: 'Intermediate', question: 'What is the difference between PUT and PATCH?', hint: 'Answer, then self-assess' },
    },
    why: {
      title: 'Why fundamentals matter more than ever',
      lead: 'Shipping got easier. Understanding what you ship did not. These are the skills that keep your judgment ahead of the tools.',
      items: [
        { title: 'Review what AI writes', text: 'Generated code compiles and still hides N+1 queries, unsafe tokens or blocking loops. Fundamentals are how you spot them.' },
        { title: 'Debug what you did not write', text: 'When production breaks, no prompt replaces knowing how the event loop, the database or HTTP actually behave.' },
        { title: 'Pass senior interviews', text: 'Senior loops test trade-offs, failure modes and reasoning out loud, not memorized syntax.' },
      ],
    },
    how: {
      title: 'How it works',
      steps: [
        { title: 'Pick a topic and level', text: 'Follow the learning path from Git to system design, and filter every deck by beginner, intermediate or advanced.' },
        { title: 'Recall, then reveal', text: 'Try to answer from memory first. Flip the card and mark it as known or to review. Progress stays in your browser.' },
        { title: 'See it, then go deeper', text: 'Step through interactive diagrams and follow curated links to the docs and RFCs that go beyond the card.' },
      ],
    },
    topics: { title: 'The learning path', lead: 'Fifteen topics, ordered so each one builds on the last.', cards: 'cards', open: 'Open topic' },
    topicPage: { back: 'All topics', why: 'Why it matters', resources: 'Go deeper', step: 'Step', of: 'of', diagram: 'Interactive diagram', practice: 'Practice' },
    footer: { text: 'Built to help engineers understand, not just generate.', top: 'Back to top' },
    switchTo: 'Español',
    deck: { all: 'All', show: 'Show answer', hide: 'Hide answer', known: 'I know it', review: 'Review again', prev: 'Previous', next: 'Next', of: 'of', mastered: 'mastered', empty: 'No cards for this level.' },
    diagram: { prev: 'Previous', next: 'Next', play: 'Play', pause: 'Pause', reset: 'Reset', step: 'Step', of: 'of', aria: 'Interactive diagram' },
    level: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
  },
  es: {
    siteTitle: 'Senior Flashcards',
    metaDescription:
      'Flashcards, diagramas interactivos y recursos seleccionados para dominar los fundamentos de backend y superar entrevistas técnicas senior.',
    nav: { topics: 'Temas', why: 'Por qué los fundamentos', how: 'Cómo funciona' },
    themeToggle: 'Cambiar entre tema claro y oscuro',
    languageLabel: 'Idioma',
    hero: {
      eyebrow: 'Primero los fundamentos',
      title: 'Domina los fundamentos.',
      titleAccent: 'Construye con confianza.',
      lead: 'La IA puede escribir el código. Quienes lo entienden son quienes lo revisan, lo depuran y lo diseñan. Construye bases sólidas de backend con flashcards, diagramas interactivos y recursos seleccionados.',
      primary: 'Empezar a aprender',
      secondary: 'Por qué importa',
      stats: { topics: 'temas', cards: 'tarjetas', levels: 'niveles' },
      sample: { level: 'Intermedio', question: '¿Cuál es la diferencia entre PUT y PATCH?', hint: 'Responde y autoevalúate' },
    },
    why: {
      title: 'Por qué los fundamentos importan más que nunca',
      lead: 'Publicar es más fácil que antes. Entender lo que publicas, no. Estas son las habilidades que mantienen tu criterio por delante de las herramientas.',
      items: [
        { title: 'Revisa lo que escribe la IA', text: 'El código generado compila y aun así esconde consultas N+1, tokens inseguros o bucles bloqueantes. Los fundamentos te permiten detectarlos.' },
        { title: 'Depura lo que no escribiste', text: 'Cuando producción falla, ningún prompt reemplaza saber cómo se comportan realmente el event loop, la base de datos o HTTP.' },
        { title: 'Supera entrevistas senior', text: 'Las entrevistas senior evalúan trade-offs, modos de falla y razonar en voz alta, no sintaxis memorizada.' },
      ],
    },
    how: {
      title: 'Cómo funciona',
      steps: [
        { title: 'Elige un tema y un nivel', text: 'Sigue la ruta de aprendizaje desde Git hasta system design y filtra cada mazo por principiante, intermedio o avanzado.' },
        { title: 'Recuerda y luego revela', text: 'Intenta responder de memoria primero. Gira la tarjeta y márcala como sabida o para repasar. El progreso queda en tu navegador.' },
        { title: 'Visualiza y profundiza', text: 'Recorre diagramas interactivos paso a paso y sigue enlaces a la documentación y los RFC que van más allá de la tarjeta.' },
      ],
    },
    topics: { title: 'La ruta de aprendizaje', lead: 'Quince temas, ordenados para que cada uno se apoye en el anterior.', cards: 'tarjetas', open: 'Abrir tema' },
    topicPage: { back: 'Todos los temas', why: 'Por qué importa', resources: 'Para profundizar', step: 'Paso', of: 'de', diagram: 'Diagrama interactivo', practice: 'Práctica' },
    footer: { text: 'Creado para ayudar a entender, no solo a generar código.', top: 'Volver arriba' },
    switchTo: 'English',
    deck: { all: 'Todos', show: 'Mostrar respuesta', hide: 'Ocultar respuesta', known: 'Lo sé', review: 'Repasar', prev: 'Anterior', next: 'Siguiente', of: 'de', mastered: 'dominadas', empty: 'No hay tarjetas para este nivel.' },
    diagram: { prev: 'Anterior', next: 'Siguiente', play: 'Reproducir', pause: 'Pausar', reset: 'Reiniciar', step: 'Paso', of: 'de', aria: 'Diagrama interactivo' },
    level: { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' },
  },
} as const satisfies Record<Locale, unknown>;

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
