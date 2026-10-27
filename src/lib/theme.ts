export type Theme = 'light' | 'dark';
export const THEME_KEY = 'sf:theme';

export const parseStored = (value: string | null): Theme | null =>
  value === 'light' || value === 'dark' ? value : null;

export const resolveTheme = (stored: Theme | null, systemDark: boolean): Theme =>
  stored ?? (systemDark ? 'dark' : 'light');

export const nextTheme = (current: Theme): Theme => (current === 'dark' ? 'light' : 'dark');
