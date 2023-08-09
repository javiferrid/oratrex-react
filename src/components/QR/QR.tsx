import React from 'react'
import QRCode from 'react-qr-code'
import advertencia from '../../assets/advertencia.png'

import './QR.scss'

interface Props {
  value: string
  disable?: boolean
  size?: number
  QRColor?: string
}

export const QR = ({ value = 'https://oratrex.com', disable = false, size, QRColor }: Props): JSX.Element => {
  return (
    <>
      {
        !disable
          ? (
            <div className='qr-container'>
              <QRCode value={value} level="H" size={size} fgColor={QRColor} />
            </div>
          )
          : (
            <div className='qr-container'>
              <QRCode value="EsteQResINvalido" level="H" size={size} fgColor={QRColor} />
              <div className='advertencia'>
                <img src={advertencia} alt="alert" />
              </div>
            </div>
          )
      }

    </>
  )
}
