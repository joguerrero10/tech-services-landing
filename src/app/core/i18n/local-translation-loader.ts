import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of, throwError } from 'rxjs';
import en from './locales/en.json';
import es from './locales/es.json';
import { isLanguage, TranslationDictionary } from './translation.model';

const DICTIONARIES: Record<'es' | 'en', TranslationDictionary> = { es, en };
@Injectable()
export class LocalTranslationLoader extends TranslateLoader {
  override getTranslation(language: string): Observable<TranslationDictionary> {
    if (!isLanguage(language))
      return throwError(() => new Error(`Unsupported language: ${language}`));
    return of(DICTIONARIES[language]);
  }
}
