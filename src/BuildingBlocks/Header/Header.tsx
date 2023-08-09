import React, { useContext } from "react";

import "./Header.scss";

interface Props {
  title: any;
  subtitle?: any;
}

export const Header = ({ title, subtitle }: Props): JSX.Element => {
  return (
    <header className="header">
      <h2 className={`b1 light-text-secondary`}>{subtitle}</h2>
      <h1 className={`h1 light-text`}>{title}</h1>
    </header>
  );
};
