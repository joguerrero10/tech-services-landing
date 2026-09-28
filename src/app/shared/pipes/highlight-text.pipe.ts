import { Pipe, PipeTransform } from '@angular/core';

export interface HighlightPart {
  readonly text: string;
  readonly highlighted: boolean;
}

/** Styles a phrase inside a complete translation without parsing or injecting HTML. */
@Pipe({ name: 'highlightText' })
export class HighlightTextPipe implements PipeTransform {
  transform(text: string, phrase: string): readonly HighlightPart[] {
    const start = phrase ? text.indexOf(phrase) : -1;
    if (start < 0) return [{ text, highlighted: false }];
    return [
      { text: text.slice(0, start), highlighted: false },
      { text: text.slice(start, start + phrase.length), highlighted: true },
      { text: text.slice(start + phrase.length), highlighted: false },
    ].filter((part) => part.text.length > 0);
  }
}
