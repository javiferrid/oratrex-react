import React from "react";
import { Header } from "../BuildingBlocks/Header/Header";
import { NavBar } from "../components/NavBar/NavBar";
import { useSelector } from "react-redux";
import "./MainLayout.scss";
interface Props {
  children: any;
  titleHeader: any;
  subtitleHeader?: any;
  style?: any;
}

export const MainLayout = ({
  children,
  titleHeader,
  subtitleHeader,
  style,
}: Props) => {
  const user = useSelector((state: any) => state.user).value;

  return (
    <div className="layout-container" style={style}>
      <Header title={titleHeader} />
      <div className="children-container">{children}</div>
      <NavBar />
    </div>
  );
};
