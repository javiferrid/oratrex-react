import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

import "./LoginScreen.scss";
import { userService } from "../../services/user";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/slices/userSlice";

import { NavBackHeader } from "../../BuildingBlocks/NavBackHeader/NavBackHeader";
import { usePageTransition } from "../../hooks/usePageTransition";
import { useTranslation } from "react-i18next";
import { Modal } from "../../components/Modal/Modal";

export const LoginScreen = (): JSX.Element => {
  const { t } = useTranslation("common");
  const { ref } = usePageTransition();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState("");
  const [validationForm, setValidationForm] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (formData.password.length > 0 && formData.email.length > 0) {
      setValidationForm(true);
      return;
    }
    setValidationForm(false);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  const login = async () => {
    try {
      const res = await userService.loginWithForm({
        email: formData.email,
        password: formData.password,
      });

      if (res.error) {
        throw res.error;
      }

      if (!res.jwt) {
        throw res?.Error;
      }

      localStorage.setItem("auth_token", res.jwt);

      dispatch(setUserData(res));
      navigate("/eventos");

      if (!res.user.terminosCondiciones) {
        // navigate('/eventos');
        navigate("/terminos-y-condiciones");
        return;
      }
      navigate("/eventos");
    } catch (err: any) {
      setErrorStatus(err.status);
      setOpenModal(true);
    }
  };

  const handlePassword = () => {
    setSeePassword(!seePassword);
  };

  return (
    <div ref={ref}>
      <NavBackHeader title={t("login-screen.title")} />

      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-container">
          <Input
            name="email"
            placeholder={t("login-screen.email-ph")}
            onChange={handleInputChange}
            value={formData.email}
            label={`${t("login-screen.email-label")}`}
            type="email"
          />
          <div className="input-password">
            <Input
              name="password"
              placeholder={t("login-screen.password-ph")}
              onChange={handleInputChange}
              value={formData.password}
              type={seePassword ? "text" : "password"}
              label={`${t("login-screen.password-label")}`}
            />
            <i
              className={`fa-solid ${
                !seePassword ? "fa-eye" : "fa-eye-slash"
              } light-text-secondary`}
              onClick={handlePassword}
            />
          </div>
        </div>

        <div className="button-container flex justify-center">
          <Button disabled={!validationForm} type="submit">
            {`${t("login-screen.login")}`}
          </Button>
        </div>
      </form>

      <Modal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        imgUrl="fa-solid fa-triangle-exclamation"
        setIconAsImg={true}
        title={`${t(`errors.${errorStatus}.title`)}`}
        description={`${t(`errors.${errorStatus}.description`)}`}
      >
        <Button onClick={() => setOpenModal(false)}>
          {`${t(`errors.${errorStatus}.accept`)}`}
        </Button>
      </Modal>
    </div>
  );
};
