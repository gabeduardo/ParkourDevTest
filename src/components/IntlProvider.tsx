import React, { createContext, useState, useContext, ReactNode } from "react";
import { IntlProvider } from "react-intl";
import messagesEn from "../../public/locales/en.json";
import messagesEs from "../../public/locales/es.json";

type LanguageOption = {
  key: string;
  label: string;
};

interface LanguageContextProps {
  locale: string;
  languages: { [key: string]: LanguageOption };
  changeLanguage: (newLocale: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

const languages = {
  es: { key: "es", label: "Español" },
  en: { key: "en", label: "English" },
};

const messages: { [key: string]: any } = {
  en: messagesEn,
  es: messagesEs,
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<string>("en");

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, languages }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
