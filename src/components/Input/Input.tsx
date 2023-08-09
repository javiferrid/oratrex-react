import React, { useContext } from "react";

import "./Input.scss";

interface Props {
  name: string;
  value: string;
  placeholder?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email";
  label?: any;
  readonly?: boolean;
}

export const Input = ({
  name,
  value,
  placeholder = "",
  onChange,
  type,
  label,
  readonly = false,
}: Props) => {
  return (
    <>
      <label className={`b2 light-text`}>{label}</label>
      <input
        type={type}
        className={`input light-input b1`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={readonly}
      />
    </>
  );
};
