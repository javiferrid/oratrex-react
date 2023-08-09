import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";

import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import "./CodeValidationScreen.scss";
import { Modal } from "../../components/Modal/Modal";
import { useViewportHeight } from "../../hooks/useViewPortHeight";
import { useTranslation } from "react-i18next";
import { ConfigContext } from "../../context/config.context";
import { NavBackHeader } from "../../BuildingBlocks/NavBackHeader/NavBackHeader";

export const CodeValidationScreen = () => {
  const navigate = useNavigate();
  const { selectedEvent } = useContext(ConfigContext);

  const { viewportHeight } = useViewportHeight();
  const { t } = useTranslation("common");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [errorStatus, setErrorStatus] = useState("");

  const [code, setCode] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);

  useEffect(() => {
    if (code.length === 0) {
      setDisabledBtn(true);
      return;
    }
    setDisabledBtn(false);
  }, [code]);

  const handleInputChange = (e: any) => {
    setCode(e.currentTarget.value);
  };

  const handleSubmit = () => {
    scanCodeBack(code);
    setCode("");
  };

  const clickScan = () => {
    const isAndroid = navigator.userAgent.toString().includes("Android");
    if (!isAndroid) {
      (window as any)?.webkit?.messageHandlers?.openQrHandler.postMessage("");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Android!.showMessageInNative();
  };

  function scanCode(barcode: string) {
    scanCodeBack(barcode);
  }

  const scanCodeBack = (barcode: string) => {
    return navigate(`/ticket/${barcode}`);
  };

  function handleQRCodeValue(barcode: string) {
    scanCodeBack(barcode);
  }

  (window as any).handleQRCodeValue = handleQRCodeValue;

  (window as any).scanCode = scanCode;

  if (!selectedEvent.id) {
    return (
      <>
        <NavBackHeader
          title={t("code-val-screen.title")}
          action={() => navigate("/eventos")}
        />

        <div className="validation-container empty">
          <p className={`light-text text-center b1`}>
            {t("code-val-screen.no-event-selected")}
          </p>

          <div className="buttons-container flex column align-center">
            <Button
              icon={{ name: faQrcode, position: "left" }}
              onClick={() => navigate("/eventos")}
              customWidth={195}
            >
              Volver
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBackHeader
        title={t("code-val-screen.title")}
        action={() => navigate("/eventos")}
      />

      <div className="validation-container">
        <p className={`light-text b2`}>{t("code-val-screen.instructions")}</p>
        <div className="buttons-container flex column align-center">
          <Input
            name="code"
            value={code}
            onChange={handleInputChange}
            placeholder={t("code-val-screen.code-ph")}
          />

          <Button
            type="submit"
            outlined
            customWidth={195}
            disabled={disabledBtn}
            onClick={() => handleSubmit()}
          >
            {t("code-val-screen.validate")}
          </Button>

          <div className="flex align-center">
            <div className={`line light-line`} />
            <p className={`light-text b2 letter`}>ó</p>
            <div className={`line light-line`} />
          </div>

          <Button
            icon={{ name: faQrcode, position: "left" }}
            onClick={clickScan}
            customWidth={195}
          >
            {`${t("code-val-screen.scan")}`}
          </Button>
        </div>
      </div>

      <Modal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        imgUrl="fa-solid fa-triangle-exclamation"
        setIconAsImg={true}
        title={`${t(`errors.${errorStatus}.title`)}`}
        description={`${t(`errors.${errorStatus}.description`)}`}
      >
        <Button
          onClick={() => {
            setOpenModal(false);
            navigate("/validar-codigo");
          }}
        >
          {`${t(`errors.${errorStatus}.accept`)}`}
        </Button>
      </Modal>
    </>
  );
};
