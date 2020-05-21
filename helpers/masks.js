import React from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export function DaysMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={daysMask}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

export function MoneyMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={numberMask}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

export function DurationMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={durationMask}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

const daysMask = [/\d/, /\d/, ' dias'];
const durationMask = [/\d/, /\d/, ':', /\d/, /\d/];
const numberMask = createNumberMask({
  prefix: 'R$',
  thousandsSeparatorSymbol: '.',
  decimalSymbol: ',',
  allowDecimal: true,
});
