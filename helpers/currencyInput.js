import React from 'react'
import NumberFormat from 'react-number-format'

const formatter = value => {
  if (!Number(value)) return ''
  
  const price = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value / 100)
  
  return `${price}`
}

export const formatterCurrency = (value, symbol) => {
  if (!Number(value)) return ''
  
  let price = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
  
  if(!symbol) {
    price = price.replace('R$', '')
  }
  
  return `${price}`
}

export const removeMask = (value) => {
  if (value === undefined) { return }
  if (typeof value === 'number') { return value }
  
  const result = value
    .slice(2)
    .replace(/\./g, '')
    .replace(/,/g, '.')
    .trim()
  
  return result
}

const defaultMaskOptions = {
  suffix: '',
  decimalScale: 2,
  thousandSeparator: '.',
  decimalSeparator: ',',
  allowNegative: false,
  allowLeadingZeroes: false,
  fixedDecimalScale: false,
  decimalPrecision: 2,
  placeholderChar: "\u2000"
}

function CurrencyInput(props) {
  const { ...other} = props;
  
  return (
    <NumberFormat
      {...other}
      {...defaultMaskOptions}
      format={formatter}/>
  )
}

export default CurrencyInput
