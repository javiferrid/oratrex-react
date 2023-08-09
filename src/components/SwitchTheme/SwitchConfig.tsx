import React from "react";
import "./SwitchConfig.scss";
import { Automatic } from "../../context/config.context";

export const SwitchConfig = (props: any) => {
  const automatic = localStorage.getItem("automatic");
  const handleClick = (e: any) => {
    e.preventDefault();
    props.onClick();
  };

  return (
    <>
      <label className="switch-cont" onClick={(e: any) => handleClick(e)}>
        <input
          type="checkbox"
          className={automatic == Automatic.ON ? "checkbox-checked" : ""}
        />
        <span className="switch-slider"></span>
      </label>
    </>
  );
};
