import React, { useContext } from 'react';
import './NavBar.scss';
import { NavElement } from '../NavElement/NavElement';
import { faIdCard, faUser } from '@fortawesome/free-regular-svg-icons';
import { faGear, faQrcode, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { NavElementType } from '../../types/nav';
import { setActiveTab } from '../../store/slices/navSlice';
import { useTranslation } from 'react-i18next';

export const NavBar = () => {
  const { t } = useTranslation('common');

  const activeTab = useSelector((state: any) => state.navbar).activeTab;
  const dispatch = useDispatch();

  return (
    <div
      className={`nav-container light-nav flex justify-center align-end`}
      style={{
        alignSelf: 'flex-end',
      }}
    >
      <NavElement
        icon={faTicket}
        isActive={activeTab === NavElementType.MY_EVENTS}
        updateActivetab={() => dispatch(setActiveTab(NavElementType.MY_EVENTS))}
        route={"/eventos"}
        title={t("nav-bar.events")}
      />

      {/* <NavElement
        icon={faQrcode}
        isActive={activeTab === NavElementType.VALIDATE_CODE}
        updateActivetab={() => dispatch(setActiveTab(NavElementType.VALIDATE_CODE))}
        route={"/validar-codigo"}
        title={t("nav-bar.validate")}
      /> */}

      <NavElement
        icon={faGear}
        isActive={activeTab === NavElementType.MY_PROFILE}
        updateActivetab={() => dispatch(setActiveTab(NavElementType.MY_PROFILE))}
        route={"/mi-perfil"}
        title={t("nav-bar.profile")}
      />
    </div>
  );
};
