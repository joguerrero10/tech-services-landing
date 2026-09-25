import { firstValueFrom } from 'rxjs';
import es from './locales/es.json';
import en from './locales/en.json';
import { LocalTranslationLoader } from './local-translation-loader';

function keys(value: object, prefix = ''): string[] {
  return Object.entries(value)
    .flatMap(([key, child]: [string, unknown]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (typeof child === 'object' && child !== null) return keys(child, path);
      expect(typeof child).toBe('string');
      expect(String(child).trim().length).toBeGreaterThan(0);
      return [path];
    })
    .sort();
}

describe('Local translations', () => {
  it('keeps both languages complete and nonempty', () => expect(keys(en)).toEqual(keys(es)));
  it('rejects unsupported languages', async () => {
    await expect(firstValueFrom(new LocalTranslationLoader().getTranslation('fr'))).rejects.toThrow(
      'Unsupported language',
    );
  });
});
