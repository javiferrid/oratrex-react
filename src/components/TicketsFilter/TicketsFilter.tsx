import React, { useState } from 'react';
import { FilterOption } from '../FilterOption/FilterOption';
import { Option } from '../../types/ticket';

import './TicketsFilter.scss';
import { updateFilter } from '../../store/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

export const TicketsFilter = (): JSX.Element => {
  const dispatch = useDispatch();

  const filter = useSelector((state: any) => state.filter).value;

  const updateFilterValue = () => {
    dispatch(updateFilter());
  };

  return (
    <div className='flex options-container'>
      {/* <FilterOption
        option={Option.COLLECTIBLES}
        isActive={true}
      /> */}

      {/* <FilterOption
        option={Option.UPCOMING}
        isActive={filter === Option.UPCOMING}
        updateActiveOption={updateFilterValue}
      /> */}
    </div>
  );
};
