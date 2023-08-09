import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ProfileScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { resetEvents } from "../../store/slices/eventsSlice";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal/Modal";
import { SwitchConfig } from "../../components/SwitchTheme/SwitchConfig";
import { MainLayout } from "../../layout/MainLayout";
import { ConfigContext } from "../../context/config.context";

export const ProfileScreen = (): JSX.Element => {
  const user = useSelector((state: any) => state.user).value;
  const { toggleAutomatic } = useContext(ConfigContext);
  const { t } = useTranslation("common");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openInAppBrowser = async (url: string) => {
    try {
      if ((window as any)?.webkit?.messageHandlers?.openInAppBrowser) {
        (window as any)?.webkit?.messageHandlers?.openInAppBrowser.postMessage(
          url
        );
        return;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Android!.openInAppBrowser(url);
    } catch (error) {
      window.open(url, "_blank");
    }
  };

  const itemList: any = [
    {
      key: "language",
      icon: "fa-solid fa-globe",
      label: t("profile-screen.language"),
      action: () => {
        navigate("/mi-perfil/idioma");
      },
    },
    {
      key: "logout",
      icon: "fa-solid fa-right-from-bracket",
      label: t("profile-screen.logout"),
      action: () => {
        setModalLogout(true);
      },
    },
  ];

  const [modalLogout, setModalLogout] = useState(false);

  const logoutAction = () => {
    localStorage.clear();
    dispatch(logout());
    dispatch(resetEvents());
    navigate("/");
  };

  return (
    <>
      <MainLayout
        titleHeader={t("profile-screen.title")}
        subtitleHeader={t("profile-screen.subtitle")}
        style={{ overflow: "hidden" }}
      >
        <section className={`light-prof profile-container`}>
          <div className="item-profile">
            <div className="item">
              <i className={`light-text fa-solid fa-gear`}></i>
              <p className={`light-text`}>{t("profile-screen.config")}</p>
            </div>
            <div className="action">
              <SwitchConfig onClick={() => toggleAutomatic()} />
            </div>
          </div>

          {itemList.map((item: any, index: number) => {
            return (
              <div key={index} className="item-profile" onClick={item.action}>
                <div className="item">
                  <i
                    key={`item-icon-${index}`}
                    className={`light-text ${item.icon}`}
                  ></i>
                  <p key={`item-label-${index}`} className={`light-text`}>
                    {item.label}
                  </p>
                </div>
                <div className="action">
                  <i
                    key={`item-arrow-${index}`}
                    className={`light-text fa-solid fa-arrow-right`}
                  ></i>
                </div>
              </div>
            );
          })}
        </section>
      </MainLayout>

      <Modal
        openModal={modalLogout}
        closeModal={() => setModalLogout(false)}
        imgUrl={"fa-solid fa-right-from-bracket"}
        setIconAsImg={true}
        title={`${t("modal.logout.title")}`}
      >
        <Button
          outlined
          onClick={() => {
            setModalLogout(false);
          }}
        >
          {String(t("modal.logout.cancel"))}
        </Button>
        <Button onClick={logoutAction}>
          {String(t("modal.logout.accept"))}
        </Button>
      </Modal>
    </>
  );
};
