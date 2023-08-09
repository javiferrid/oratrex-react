/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./DetailTicketScreen.scss";
import { setActiveTab } from "../../store/slices/navSlice";
import { NavElementType } from "../../types/nav";
import { useDispatch } from "react-redux";
import { ticketsService } from "../../services/tickets";
import { Loader } from "../../components/Loader/loader";
import { Automatic, ConfigContext } from "../../context/config.context";
import { NavBackHeader } from "../../BuildingBlocks/NavBackHeader/NavBackHeader";
import { formatHoursAndMinute, formatMonth } from "../../utils/formatDate";
import { useTranslation } from "react-i18next";
import { url } from "../../api/constant";

export interface Details {
  date: Date;
  eventName: string;
  img: string;
  clientColor: string;
  type: string;
  location?: string;
  time?: string;
}

export const DetailTicketScreen = ({ props }: any) => {
  const navigate = useNavigate();
  const { automatic, selectedEvent } = useContext(ConfigContext);
  const [isLoading, setLoading] = useState(true);
  const [ticket, setTicket] = useState<any>();
  const [user, setUser] = useState<any>();
  const [isValid, setIsValid] = useState("");
  const [updated, setUpdated] = useState(false);
  const { barcode } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  useEffect(() => {
    dispatch(setActiveTab(NavElementType.VALIDATE_CODE));
  }, []);

  useEffect(() => {
    if (!barcode) {
      return navigate(`/validar-codigo`);
    }

    if (!selectedEvent.id) {
      return navigate(`/eventos`);
    }

    getTicket();
  }, [barcode]);

  const getTicket = () => {
    setLoading(true);
    ticketsService
      .getTickerAndTicketHolder(barcode!)
      .then((res: any) => {
        const { ticket: t, user: u } = res;
        setTicket(t);
        setUser(u);
      })
      .catch((_: any) => {
        setIsValid("NOT_FOUND_TICKET");
        setLoading(false);
      });
  };

  const getEventData = () => {
    if (!ticket) return {};

    return ticket.tipo_ticket.Evento;
  };

  const getInstanceData = () =>
    ticket?.tipo_ticket?.instancia ?? {};

  useEffect(() => {
    if (!ticket) {
      setLoading(false);
      return;
    }

    const ticketEventId = getEventData().id;
    const eventId = selectedEvent.id;
    if (ticketEventId !== eventId) {
      return setIsValid("WRONG_EVENT");
    }

    const { status } = ticket;
    setIsValid(status);
    if (automatic === Automatic.ON && status !== "USED") {
      return markAsUSED();
    }

    setLoading(false);
  }, [ticket]);

  const makeNoise = () => {
    const isAndroid = navigator.userAgent.toString().includes("Android");
    if (isAndroid) {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        Android!.makeNoise();
      } catch (_) {
        console.log("PC");
      }
    }
  };

  const markAsUSED = () => {
    setLoading(true);
    ticketsService.updateTicketById(ticket?.id, "USED").then((_) => {
      makeNoise();
      setUpdated(true);
      setLoading(false);
    });
  };

  const markAsSOLD = () => {
    setLoading(true);
    ticketsService.updateTicketById(ticket?.id, "SOLD").then((_) => {
      makeNoise();
      getTicket();
    });
  };

  if (isLoading || !isValid.length) {
    return (
      <>
        <Loader />
      </>
    );
  }

  const getInstanceAddress = () => {
    const data = getInstanceData();
    if (!data.Direccion) {
      return "";
    }

    const address = data.Direccion;
    return `${address.Direccion}, ${address.Ciudad}`;
  };

  const getConfiguration = () => {
    if (!ticket) return {};

    return getEventData().Configuracion;
  };

  const getPortada = () => {
    if (!ticket) return {};

    return getEventData().Portada.formats;
  };

  const getHolderName = () => {
    if (!user) return "";

    return `${user.nombre} ${user.apellido}`;
  };

  const fechaPublicacion = new Date(
    getConfiguration().FechaPublicacion ?? new Date()
  );

  const showEventImage = () =>
    updated || (automatic === Automatic.ON && isValid === "SOLD");

  return (
    <div
      className={`validate-ticket-container ${isValid} ${
        showEventImage() && "automatic"
      }`}
      style={
        showEventImage()
          ? {
              backgroundImage: `url(${url}${getPortada().large?.url ?? ""})`,
            }
          : {}
      }
    >
      <NavBackHeader action={() => navigate("/validar-codigo")} />
      <div className="validate-ticket-container__header">
        <div className={`icon ${isValid}`}></div>
        <div>{t(`ticket-screen.${isValid}`)}</div>
      </div>

      {showEventImage() && (
        <div className="valid-ticket-automatic">
          <div className="icon"></div>
          <div>{t(`ticket-screen.${isValid}`).toUpperCase()}</div>
        </div>
      )}

      <div className="validate-ticket-data">
        {isValid !== "SOLD" && (
          <p className="b1 error">{t(`ticket-screen.errors.${isValid}`)}</p>
        )}

        {["SOLD", "WRONG_EVENT"].includes(isValid) && (
          <div className="validate-ticket-data__header">
            <div className="validate-ticket-data__date">
              <p className="b1b">
                {formatMonth(fechaPublicacion).toUpperCase()}
              </p>
              <p className="b1b">{fechaPublicacion.getDate()}</p>
            </div>

            <div className="validate-ticket-data__address">
              <p className="b1">{getConfiguration().Titulo?.toUpperCase()}</p>
              <p className="b1">
                {formatHoursAndMinute(fechaPublicacion)} {getInstanceAddress()}
              </p>
            </div>
          </div>
        )}

        {["SOLD", "USED"].includes(isValid) && (
          <div className="validate-ticket-data__holder">
            <b>{t("ticket-detail.titular-data")}</b>
            <p className="title">{t("ticket-detail.complete-name")}</p>
            <p>{getHolderName()}</p>
            <br />
            <p className="title">{t("ticket-detail.email-address")}</p>
            <p>{user?.email}</p>
          </div>
        )}

        <div className="expanded"></div>

        {isValid == "SOLD" && !showEventImage() && (
          <Button onClick={() => markAsUSED()}>{t("ticket-detail.mark-as-used")}</Button>
        )}

        {isValid == "USED" &&
          automatic === Automatic.OFF &&
          !showEventImage() && (
            <Button onClick={() => markAsSOLD()}>{t("ticket-detail.mark-as-unused")}</Button>
          )}
      </div>
    </div>
  );
};
