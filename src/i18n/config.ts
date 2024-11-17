import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      home: 'Home',
      trending: 'Trending',
      local: 'Local News',
      live: 'Live',
      search: 'Search news...',
      // Add more translations
    }
  },
  hi: {
    translation: {
      home: 'होम',
      trending: 'ट्रेंडिंग',
      local: 'स्थानीय समाचार',
      live: 'लाइव',
      search: 'समाचार खोजें...',
      // Add more translations
    }
  },
  te: {
    translation: {
      home: 'హోమ్',
      trending: 'ట్రెండింగ్',
      local: 'స్థానిక వార్తలు',
      live: 'లైవ్',
      search: 'వార్తలు వెతకండి...',
      // Add more translations
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;