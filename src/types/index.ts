import type { TargetLanguageCode } from 'deepl-node';

export interface ILanguage {
  language: TargetLanguageCode;
  name: string;
  supports_formality: boolean;
}

export interface ITranslateRequest {
  texts: string[];
  targetLang: TargetLanguageCode;
}
