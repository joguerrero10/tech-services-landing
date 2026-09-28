import { HighlightTextPipe } from './highlight-text.pipe';

describe('Complete translated heading highlight', () => {
  const pipe = new HighlightTextPipe();
  it('preserves wording, spaces and punctuation when emphasis moves within a translation', () => {
    for (const [title, phrase] of [
      ['Tecnología que te hace la vida más fácil.', 'más fácil'],
      ['Technology that makes your life easier.', 'easier'],
      ['Easier technology for everyone.', 'Easier'],
    ]) {
      const parts = pipe.transform(title, phrase);
      expect(parts.map((part) => part.text).join('')).toBe(title);
      expect(parts.filter((part) => part.highlighted).map((part) => part.text)).toEqual([phrase]);
    }
  });
  it('preserves a complete readable title when emphasis is absent or empty', () => {
    expect(pipe.transform('Complete title', 'missing')).toEqual([
      { text: 'Complete title', highlighted: false },
    ]);
    expect(pipe.transform('Complete title', '')).toEqual([
      { text: 'Complete title', highlighted: false },
    ]);
  });
});
