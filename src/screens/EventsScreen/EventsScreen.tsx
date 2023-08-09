import React, { useEffect, useState } from "react";
import { TicketsFilter } from "../../components/TicketsFilter/TicketsFilter";
import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../../layout/MainLayout";

import "./EventsScreen.scss";
import { eventsService } from "../../services/events";
import { url } from "../../api/constant";
import { setActiveTab } from "../../store/slices/navSlice";
import { NavElementType } from "../../types/nav";
import { setEvents } from "../../store/slices/eventsSlice";
import { EventList } from "../../components/EventList/EventList";
import { Loader } from "../../components/Loader/loader";

export const EventsScreen = (): JSX.Element => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const events = useSelector((state: any) => state.events).value;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openWinnerModal, setOpenWinnerModal] = useState<boolean>(false);
  const [customMsg, setCustomMsg] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(setActiveTab(NavElementType.MY_EVENTS));
  });

  useEffect(() => {
    getEventsData();
  }, []);

  const getEventsData = async () => {
    eventsService.getEventsData().then(async (res: any) => {
      const response = await res.json();
      const events = response ?? [];
      console.log(events);
      dispatch(setEvents(events));
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return (
      <MainLayout titleHeader={t("events-screen.title")}>
        <Loader />
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout titleHeader={t("events-screen.title")}>
        <div className="ticket-filter">
          <TicketsFilter />
        </div>

        <section className="ticket-list-container">
          <EventList apiLoading={false} events={events} />
        </section>
      </MainLayout>

      <Modal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        imgUrl=""
        setIconAsImg={true}
        title={customMsg.title}
        description={customMsg.subtitle}
      >
        <p>{customMsg.descripcion}</p>
        <img src={`${url}${customMsg.img}`} />
        <Button onClick={() => setOpenModal(false)}>{customMsg.btn}</Button>
      </Modal>

      <Modal
        openModal={openWinnerModal}
        closeModal={() => setOpenWinnerModal(false)}
        imgUrl=""
        setIconAsImg={true}
        title={`${t("modal.Kombutxa.title")}`}
        description={`${t("modal.Kombutxa.description")}`}
      >
        <Button onClick={() => setOpenWinnerModal(false)}>
          {`${t("modal.Kombutxa.accept")}`}
        </Button>
      </Modal>
    </>
  );
};
