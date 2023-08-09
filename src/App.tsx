import React, { useEffect, useState } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { Button } from "./components/Button/Button";
import { version } from "./contants";
import { versionService } from "./services/version";
import { useTranslation } from "react-i18next";
import { Modal } from "./components/Modal/Modal";
import { useNavigate } from "react-router-dom";

import "./App.css";

const App = (): JSX.Element => {
  const { t } = useTranslation('common');

  const [OS, setOS] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [updateUrl, setUpdateUrl] = useState('')

  const openInAppBrowser = async (url: string) => {
    try {
      if ((window as any)?.webkit?.messageHandlers?.openInAppBrowser) {
        (window as any)?.webkit?.messageHandlers?.openInAppBrowser.postMessage(url);
        return;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Android!.openInAppBrowser(url);
    } catch (error) {
      window.open(url, '_blank');
    }
  };

  useEffect(() => {
    localStorage.setItem("welcomeModalSeen", "false");
    getMobileOperatingSystem()
  }, []);

  useEffect(() => {
    checkVersion()
  }, [OS]);

  function getMobileOperatingSystem() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      setOS('ios')
    } else if (/Android/.test(navigator.userAgent)) {
      setOS('android')
    }
  }

  const checkVersion = () => {

    // hacer la llamada al back y comparar la versión
    versionService
      .getAppVersion()
      .then(response => {
        if (response?.data[0].attributes?.versionNumber !== version) {
          setOpenModal(true)
        }
        setUpdateUrl(response?.data[0].attributes?.url[OS])
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <div className={`light-bg bg`}></div>
      <div className={`app`}>
        <AppRoutes />
      </div>

      <Modal
        openModal={openModal}
        closeModal={() => setOpenModal(true)}
        imgUrl='fa-solid fa-bell'
        setIconAsImg={true}
        title={`${t('modal.update.title')}`}
        description={`${t('modal.update.description')}`}
      >

        <Button
          onClick={() => {
            openInAppBrowser(updateUrl);
          }}
        >
          {`${t('modal.update.accept')}`}
        </Button>
      </Modal>

    </>
  );
};

export default App;
