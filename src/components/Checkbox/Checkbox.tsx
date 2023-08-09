import React, { useContext, useState } from "react";
import "./Checkbox.scss";

interface CheckBoxProps {
  checked?: boolean;
  value?: any;
  name?: string;
  children?: any;
  onChange?: (checked: any) => void;
}
export const Checkbox = (props: CheckBoxProps) => {
  const { checked, value, name } = props;

  const handleChange = (e: any) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className={`checkbox light-checkbox `}>
      <input
        type="checkbox"
        checked={checked}
        className={checked ? "checked" : ""}
        onChange={(e: any) => handleChange(e)}
        value={value}
        name={name}
      ></input>
      {props?.children}
    </div>
  );
};
