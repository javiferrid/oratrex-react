import React, { useContext } from "react";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

import "./NavElement.scss";

interface Props {
  title: string;
  icon: IconDefinition;
  isActive: boolean;
  updateActivetab: () => void;
  route: string;
}

export const NavElement = ({
  title,
  icon,
  isActive,
  updateActivetab,
  route,
}: Props) => {
  return (
    <NavLink to={route}>
      <div
        className={`${
          isActive ? `light-nav` : `light-nav-secondary`
        } nav-option flex column justify-center`}
        onClick={updateActivetab}
      >
        <FontAwesomeIcon icon={icon} />
        <p className={`${isActive ? "captionB" : "caption"}`}>{title}</p>
      </div>
    </NavLink>
  );
};
