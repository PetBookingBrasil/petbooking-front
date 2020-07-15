import React from 'react'
import NumberFormat from 'react-number-format'

export default function PercentageInput(props) {
  const defaultMaskOptions = {
    suffix: '%',
    decimalScale: 2,
    decimalSeparator: '.',
    allowNegative: false,
    allowLeadingZeroes: false,
    fixedDecimalScale: true,
    maxLength: 99,
  }
  
  const { ...other } = props;
  
  return (
    <NumberFormat
      {...other }
      format="##.##"
      { ...defaultMaskOptions } />
  )
}
