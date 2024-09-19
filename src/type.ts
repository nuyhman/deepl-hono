import type { TargetLanguageCode } from 'deepl-node';

export type ENV = {
  DEEPL_API_KEY: string;
};

export interface ITranslateRequest {
  texts: string[];
  targetLang: TargetLanguageCode;
}
