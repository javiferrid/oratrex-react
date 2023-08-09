import React, { useContext } from "react";
import { formatHoursAndMinute, formatMonth } from "../../utils/formatDate";
import { Dropdown } from "../../components/Dropdown/Dropdown";

import "./EventDetailsScreen.scss";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/Button/Button";
import { ConfigContext } from "../../context/config.context";
import { useNavigate } from "react-router-dom";

export const EventDetailsScreen = ({ details = {} }: any) => {
  const { Configuracion } = details;
  const { Instancias } = Configuracion;
  const { t } = useTranslation("common");
  const { saveEvent } = useContext(ConfigContext);
  const navigate = useNavigate();

  const dropdownItems = [{ key: "", value: Configuracion.DescripcionLarga }];

  const fechaPublicacion = new Date(Configuracion.FechaPublicacion);

  const getInstanceAddress = () => {
    if (!Instancias.length) {
      return "";
    }

    const address = Instancias[0]?.Direccion;
    return `${address.Direccion}, ${address.Ciudad}`;
  };
  return (
    <div className="detail-event-container">
      <div className={`body-event-container flex column`} style={{}}>
        <div className="header-event-info">
          <div className="header-event-info__date">
            <p className="b1b">{formatMonth(fechaPublicacion).toUpperCase()}</p>
            <p className="b1b">{fechaPublicacion.getDate()}</p>
          </div>

          <div className="header-event-info__address">
            <p className="b1">{Configuracion.Titulo.toUpperCase()}</p>
            <p className="b1">
              {formatHoursAndMinute(fechaPublicacion)} {getInstanceAddress()}
            </p>
          </div>
        </div>
        <div className="event-description-container ">
          {Configuracion.DescripcionLarga}
        </div>
        <Dropdown
          title={t("event-detail-screen.details")}
          dropdownItems={dropdownItems}
        />

        <div className="event-button-container">
          <Button
            onClick={() => {
              saveEvent(details);
              navigate("/validar-codigo");
            }}
          >
            VALIDAR TICKETS
          </Button>
        </div>
      </div>
    </div>
  );
};
