import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./DetailEventScreen.scss";
import { EventDetailsScreen } from "../EventDetailsScreen/EventDetailsScreen";
import { useSelector } from "react-redux";
import { eventsService } from "../../services/events";
import { Loader } from "../../components/Loader/loader";
import { NavBackHeader } from "../../BuildingBlocks/NavBackHeader/NavBackHeader";

export interface Details {
  date: Date;
  eventName: string;
  img: string;
  clientColor: string;
  type: string;
  location?: string;
  time?: string;
}

export const DetailEventScreen = ({ props }: any) => {
  const navigate = useNavigate();
  const events = useSelector((state: any) => state.events).value;
  const { eventId: id } = useParams();
  const [details, setDetails] = useState<any>(
    events.find((event: any) => event.id == id)
  );
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!details) {
      navigate('/eventos');
    }
  }, [details]);

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <NavBackHeader action={() => navigate("/eventos")} />

      {details?.id && <EventDetailsScreen details={details} />}
    </>
  );
};
