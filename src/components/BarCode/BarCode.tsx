import React from 'react'
import Barcode from 'react-barcode'

import advertencia from '../../assets/advertencia.png'
import './BarCode.scss'

interface Props {
  value: string 
  disable?: boolean
  width?: number
  height?: number
  fontSize?: number
}
export const BarCode = ({ value, disable = true, height = 40, width = 1, fontSize = 0 }: Props): JSX.Element => {

  return (
  <> {
    disable
      ? (
        <div className='barcode-container'>
          <Barcode value= "EsteQResINvalido" width={1} height={height} fontSize={fontSize}/>
          <div className='advertencia'>
            <img src={advertencia} alt="alert"/>
          </div>
        </div>
        )
      : (
        <div className='barcode-container'>
          <Barcode format='EAN13' value="httratrex.com" width={0.5} height={height} fontSize={fontSize}/>
        </div>
        )
  }
  </>
  )
}
