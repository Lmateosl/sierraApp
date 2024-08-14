import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next) // Asegúrate de usar initReactI18next aquí
  .init({
    fallbackLng: 'es',
    debug: true,
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['header']
  });

export default i18n;
