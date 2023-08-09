import React, { useContext } from "react";
import { type Status } from "../../types/ticket";

import "./TicketStatus.scss";

interface Props {
  status: Status;
}

export const TicketStatus = ({ status }: Props): JSX.Element => {
  return (
    <div className={`status-container flex align-center light-mode`}>
      <p className="captionB text">{status.toLocaleUpperCase()}</p>
    </div>
  );
};
