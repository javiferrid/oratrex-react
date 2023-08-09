import React, { useState } from 'react';
import './LanguageScreen.scss';
import { useTranslation } from 'react-i18next';
import { NavBackHeader } from '../../../BuildingBlocks/NavBackHeader/NavBackHeader';
import { Checkbox } from '../../../components/Checkbox/Checkbox';
import { useSelector } from 'react-redux';

export const LanguageScreen = (): JSX.Element => {
  const { t, i18n } = useTranslation('common');
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const user = useSelector((state: any) => state.user).value;

  const handleCheckboxChange = (event: any) => {
    setSelectedLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
    localStorage.setItem('lang', event.target.value);
  };

  return (
    <>
      <NavBackHeader title={t('language-screen.title')} />
      <div className='container'>
        <form className='language-form'>
          <Checkbox
            value='es'
            name='es'
            checked={selectedLanguage === 'es'}
            onChange={handleCheckboxChange}
          >
            Castellano
          </Checkbox>
          <Checkbox
            value='ca'
            name='ca'
            checked={selectedLanguage === 'ca'}
            onChange={handleCheckboxChange}
          >
            Català
          </Checkbox>
          <Checkbox
            value='en'
            name='en'
            checked={selectedLanguage === 'en'}
            onChange={handleCheckboxChange}
          >
            English
          </Checkbox>
        </form>
      </div>
    </>
  );
};
