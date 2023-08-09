import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, useNavigate } from "react-router-dom";
import App from "./App";

// import 'semantic-ui-css/semantic.min.css'
import "./scss/global.scss";
import "./scss/colors.scss";
import "./scss/fonts.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import { store } from "../src/store/index";
import { Provider } from "react-redux";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import common_es from "./translations/es/common.json";
import common_en from "./translations/en/common.json";
import common_ca from "./translations/ca/common.json";
import { ConfigProviderWrapper } from "./context/config.context";

export const getNavigatorLanguage = () => {
  const storageLang = localStorage.getItem("lang");
  if (!storageLang) {
    const navLang = window.navigator.language;
    localStorage.setItem("lang", navLang.split("-")[0]);
    return navLang.split("-")[0];
  }

  return storageLang;
};

i18next.init({
  interpolation: { escapeValue: false },
  lng: getNavigatorLanguage(),
  resources: {
    es: {
      common: common_es,
    },
    en: {
      common: common_en,
    },
    ca: {
      common: common_ca,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <ConfigProviderWrapper>
        <Router>
          <App />
        </Router>
      </ConfigProviderWrapper>
    </I18nextProvider>
  </Provider>
);
