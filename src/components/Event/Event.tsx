import React from "react";

import { formatMonth } from "../../utils/formatDate";
import { formatString } from "../../utils/formatString";

import "./Event.scss";

export const Event = ({ Configuracion }: any): JSX.Element => {
  const fechaPublicacion = new Date(Configuracion.Instancias[0].Periodo.Inicio);
  return (
    <div
      className={`flex ticket-container light light-default-bg round-left round-right align-center`}
    >
      <div className="flex info-container">
        <div className="text-center">
          <p className="b1">
            {formatMonth(fechaPublicacion).toUpperCase()}
            <br />
            {fechaPublicacion.getDate()}
          </p>
        </div>
        <p style={{ maxWidth: "170px" }} className="b1">
          {formatString(Configuracion.Titulo).toUpperCase()}
        </p>
      </div>
    </div>
  );
};
