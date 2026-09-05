export const radius = {
  none: '0px',
  sm: '4px',
  md: '6px',
  ktun: '8px',
  lg: '10px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
} as const;

export type RadiusToken = keyof typeof radius;
