import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Event } from '../Event/Event';
import { Button } from '../Button/Button';
import { setActiveTab } from '../../store/slices/navSlice';

import { type TicketT } from '../../types/ticket';
import { NavElementType } from '../../types/nav';

import './EventList.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  events?: TicketT[];
  apiLoading: boolean;
}

export const EventList = ({ events, apiLoading }: Props): JSX.Element => {
  const { t } = useTranslation('common');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoadingTicket = (
    <div className='ticket-container flex light' style={{ opacity: 0.5 }}>
      <div
        className={`flex-60 light-default-bg round-left flex align-center`}
      >
        <div className='flex info-container'>
          <div className='text-center'>
            <p className='glow-text'>
              <span className='b1b'>YEAR</span>
              <br />
              <span className='caption'>ABR 14</span>
            </p>
          </div>
          <p style={{ maxWidth: '140px' }} className='b1 glow-text'>
            NAME OF EVENT
          </p>
        </div>
      </div>

      <div className='flex-40'>
        <div className={`gradient light-bg-gradient`}></div>
      </div>
    </div>
  );

  if (apiLoading) {
    return <ul className='flex column ticket-list'>{LoadingTicket}</ul>;
  }

  const handleClick = (ticket: any): void => {
    navigate(`/eventos/${ticket.id}`);
  };

  return (
    <div className='flex column ticket-list'>
      {events !== undefined && events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li
              key={event.id}
              className='overlap'
              onClick={() => handleClick(event)}
            >
              <Event {...event} />
            </li>
          ))}
        </ul>
      ) : (
        <div className='flex column align-center empty-list'>
          <p className={`b2 light-text message`}>
            No hay eventos próximos
          </p>
        </div>
      )}
    </div>
  );
};
