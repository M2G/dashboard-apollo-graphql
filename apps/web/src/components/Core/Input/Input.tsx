import clsx from 'clsx';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import styles from './Input.module.scss';

interface InputProps {
  autoComplete: string;
  autoCorrect: string;
  className: string;
  dataQa: string;
  disabled: boolean;
  error: string;
  helper: string;
  hidden: boolean;
  id: string;
  indicator: boolean | string;
  label: string;
  max: number;
  maxLength: number;
  min: number;
  minLength: number;
  name: string;
  onBlur: () => NonNullable<unknown>;
  onChange: ({ target: { value } }: any) => void;
  onFocus: () => NonNullable<unknown>;
  onKeyDown: () => NonNullable<unknown>;
  required: boolean;
  reset: boolean;
  reverse: boolean;
  spellCheck: boolean;
  step: boolean;
  touched: boolean;
  type: string;
  valid: boolean;
  value: string;
}

const Input = forwardRef(
  (
    {
      autoComplete,
      autoCorrect,
      className,
      dataQa,
      disabled,
      error,
      helper,
      hidden,
      id,
      indicator,
      label,
      max,
      maxLength,
      min,
      minLength,
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      required,
      reset,
      reverse,
      spellCheck,
      step,
      touched,
      type,
      valid,
      value,
    }: InputProps,
    ref,
  ) => {
    const inputStyle = clsx('input', styles.input, className);

    return (
      <input
        aria-hidden={type === 'hidden'}
        aria-label={label && label}
        aria-required={required}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        className={inputStyle}
        data-qa={dataQa}
        disabled={disabled}
        hidden={hidden}
        id={id}
        max={max}
        maxLength={maxLength}
        min={min}
        minLength={minLength}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        ref={ref}
        required={required}
        spellCheck={spellCheck}
        step={step}
        type={type}
        value={value}
      />
    );
  },
);

Input.displayName = 'Input';

Input.propTypes = {
  autoComplete: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  autoCorrect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  className: PropTypes.string,
  dataQa: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helper: PropTypes.string,
  hidden: PropTypes.bool,
  iconComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.bool,
  ]),
  id: PropTypes.string,
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  label: PropTypes.string,
  max: PropTypes.number,
  maxLength: PropTypes.number,
  min: PropTypes.number,
  minLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  required: PropTypes.bool,
  reset: PropTypes.bool,
  reverse: PropTypes.bool,
  spellCheck: PropTypes.bool,
  step: PropTypes.bool,
  touched: PropTypes.bool,
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'number',
    'tel',
    'search',
    'hidden',
  ]).isRequired,
  valid: PropTypes.bool,
  value: PropTypes.string,
};

Input.defaultProps = {
  autoComplete: undefined,
  autoCorrect: undefined,
  className: undefined,
  dataQa: '',
  disabled: false,
  error: '',
  helper: '',
  hidden: false,
  iconComponent: undefined,
  id: undefined,
  indicator: undefined,
  label: '',
  max: undefined,
  maxLength: undefined,
  min: undefined,
  minLength: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  required: false,
  reset: false,
  reverse: false,
  spellCheck: false,
  step: undefined,
  touched: true,
  valid: false,
  value: '',
};

export default Input;
