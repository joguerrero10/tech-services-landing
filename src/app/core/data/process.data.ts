import type { TranslationKey } from '../i18n/translation.model';
interface ProcessStep {
  readonly id: string;
  readonly number: TranslationKey;
  readonly title: TranslationKey;
  readonly description: TranslationKey;
}
export const PROCESS_STEPS = [
  {
    id: 'conversation',
    number: 'process.conversation.number',
    title: 'process.conversation.title',
    description: 'process.conversation.description',
  },
  {
    id: 'scope',
    number: 'process.scope.number',
    title: 'process.scope.title',
    description: 'process.scope.description',
  },
  {
    id: 'collaboration',
    number: 'process.collaboration.number',
    title: 'process.collaboration.title',
    description: 'process.collaboration.description',
  },
] as const satisfies readonly ProcessStep[];
