import { IntlProvider } from "react-intl";
import enMessages from "../../public/locales/en.json";
import esMessages from "../../public/locales/es.json";
import { ReactNode } from "react";

const messages = {
  en: enMessages,
  es: esMessages,
};

interface IntlProviderWrapperProps {
  children: ReactNode;
  locale: "en" | "es";
}

const IntlProviderWrapper: React.FC<IntlProviderWrapperProps> = ({
  children,
  locale,
}) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    {children}
  </IntlProvider>
);

export default IntlProviderWrapper;
