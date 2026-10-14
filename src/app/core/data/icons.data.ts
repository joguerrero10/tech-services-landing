export const ICON_NAMES = [
  'arrow-right',
  'tt-mark',
  'calculator',
  'code-xml',
  'laptop-code',
  'menu',
  'messages-square',
  'terminal',
  'wallet',
  'wrench',
  'x',
] as const;

export type IconName = (typeof ICON_NAMES)[number];
