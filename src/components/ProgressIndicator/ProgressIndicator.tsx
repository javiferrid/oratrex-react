import React from 'react'
import { type TicketT } from '../../types/ticket'

import './ProgressIndicator.scss'

interface Props {
  array: [TicketT]
  activeIndex: number
}

export const ProgressIndicator = ({ array, activeIndex }: Props): JSX.Element => {
  return (
    <div className='flex progress-indicator-container'>
      {array.map((elm, index) => <div key={index} className={`dot ${activeIndex === index ? 'active' : 'inactive'}`}></div>)}
    </div>
  )
}
