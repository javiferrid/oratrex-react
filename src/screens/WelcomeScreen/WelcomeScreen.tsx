import React, { useContext, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { clientName } from "../../contants";
import { useNavigate } from "react-router-dom";

import "./WelcomeScreen.scss";
import { useTranslation } from "react-i18next";

export const WelcomeScreen = () => {
  const { t, i18n } = useTranslation("common");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      navigate("/eventos");
    }
  }, []);

  return (
    <div
      className={`welcome-body flex column align-center light-welcome-body-bg`}
    >
      <h2 className={`b1 light-text-secondary`}>{t("welcome-screen.title")}</h2>
      <h1 className={`h1 light-text`}>{clientName.toLocaleUpperCase()}</h1>

      <div className="welcome-buttons flex column align-center">
        <Button onClick={() => navigate("/login")}>
          {t("welcome-screen.login")}
        </Button>
      </div>
    </div>
  );
};
