export const ICON_NAMES = [
  'arrow-right',
  'book-open',
  'calculator',
  'code-xml',
  'laptop',
  'laptop-code',
  'menu',
  'messages-square',
  'terminal',
  'wallet',
  'wrench',
  'x',
] as const;

export type IconName = (typeof ICON_NAMES)[number];
