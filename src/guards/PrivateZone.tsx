import React from 'react';
import { Navigate } from 'react-router-dom';
import { userService } from '../services/user';
import { setEvents } from '../store/slices/eventsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../store/slices/userSlice';
import { eventsService } from '../services/events';

export const PrivateZone = ({ children }: any) => {
  const token = localStorage.getItem('auth_token');
  const user = useSelector((state: any) => state.user).value;

  if (!user.activo) {
    getDataUser();
  }

  return token ? children : <Navigate to='/' />;
};

const getDataUser = async () => {
  const token = localStorage?.getItem('auth_token');
  const dispatch = useDispatch();
  if (!token) {
    return;
  }

  userService.getUserData().then((res: any) => {
    dispatch(setUserData(res));
  });
};
