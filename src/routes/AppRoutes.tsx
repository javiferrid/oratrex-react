import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { EventsScreen } from '../screens/EventsScreen/EventsScreen';
import { DetailEventScreen } from '../screens/DetailEventScreen/DetailEventScreen';
import { CodeValidationScreen } from '../screens/CodeValidationScreen/CodeValidationScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen/WelcomeScreen';
import { LoginScreen } from '../screens/LoginScreen/LoginScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import { LanguageScreen } from '../screens/ProfileScreen/LanguageScreen/LanguageScreen';
import { PrivateZone } from '../guards/PrivateZone';
import { DetailTicketScreen } from '../screens/DetailTicketScreen/DetailTicketScreen';

export const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path='*' element={<WelcomeScreen />} />
      <Route path='/' element={<WelcomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route
        path='/validar-codigo'
        element={
          <PrivateZone>
            <CodeValidationScreen />
          </PrivateZone>
        }
      />
      <Route
        path='/eventos'
        element={
          <PrivateZone>
            <EventsScreen />
          </PrivateZone>
        }
      />
      <Route
        path='/eventos/:eventId'
        element={
          <PrivateZone>
            <DetailEventScreen />
          </PrivateZone>
        }
      />
      <Route
        path='/ticket/:barcode'
        element={
          <PrivateZone>
            <DetailTicketScreen />
          </PrivateZone>
        }
      />
      <Route
        path='/mi-perfil'
        element={
          <PrivateZone>
            <ProfileScreen />
          </PrivateZone>
        }
      />
      <Route
        path='/mi-perfil/idioma'
        element={
          <PrivateZone>
            <LanguageScreen />
          </PrivateZone>
        }
      />
    </Routes>
  );
};
