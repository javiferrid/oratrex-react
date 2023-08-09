import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import "./NavBackHeader.scss";

interface Props {
  title?: any;
  action?: (() => void) | null;
}

export const NavBackHeader = ({ title, action }: Props) => {
  const navigate = useNavigate();

  return (
    <header className="flex nav-back-header align-center justify-start">
      <Button
        icon={{ name: faAngleLeft, position: "center", size: "xl" }}
        extraClass="backbutton"
        onClick={() => (action ? action() : navigate(-1))}
      />
      <h1 className={`b2 header-title light-text`}>
        {title?.toLocaleUpperCase()}
      </h1>
    </header>
  );
};
