import React, { useContext } from "react";

import "./Button.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Props {
  icon?: Icon;
  disabled?: boolean;
  outlined?: boolean;
  size?: "xl" | "lg" | "sm";
  onClick?: () => void;
  children?: any;
  customWidth?: number;
  type?: "button" | "submit" | "reset" | undefined;
  extraClass?: string;
}

interface Icon {
  name: IconDefinition;
  position?: "left" | "right" | "center";
  size?: string;
}

export const Button = ({
  icon,
  disabled = false,
  outlined = false,
  size = "lg",
  type = "button",
  customWidth,
  children,
  onClick,
  extraClass
}: Props): JSX.Element => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={
        `button flex align-center justify-center button-content
        ${disabled ? `light-disabled` : `light-default`}
        ${children === undefined ? `${size}-size` : "min-width"}
        ${children === undefined ? `${size}-size` : "min-width"}
        ${outlined ? `light-outlined` : ""}
        ${!children ? `light-no-text` : ""}
        ${extraClass ?? ''}`
      }
      onClick={() => !disabled && onClick && onClick()}
      style={customWidth ? { width: customWidth } : {}}
    >
      {icon?.position === "center" &&
        (icon?.size === "sm" || icon?.size === "xl") && (
          <FontAwesomeIcon icon={icon.name} size={icon.size} />
        )}
      {icon !== null && icon?.position === "left" && (
        <FontAwesomeIcon icon={icon.name} />
      )}
      {children?.toLocaleUpperCase()}
      {icon !== null && icon?.position === "right" && (
        <FontAwesomeIcon icon={icon.name} />
      )}
    </button>
  );
};
