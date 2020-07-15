import React from 'react'
import NumberFormat from 'react-number-format'

export default function DurationInput(props) {
  const { ...other} = props;
  
  return (
    <NumberFormat
      {...other}
      format="##:##"
      mask={['H', 'H', 'M', 'M']}/>
  )
}
