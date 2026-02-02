import { useApp } from '@/contexts/AppContext';
import { translations, TranslationKey } from '@/lib/translations';

export function useTranslation() {
  const { language } = useApp();
  
  const t = (key: TranslationKey): string => {
    return translations[language][key];
  };

  return { t, language };
}
