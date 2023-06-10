import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
  onBlur: () => {};
  onChange: () => {};
  onFocus: () => {};
  onKeyDown: () => {};
  required: boolean;
  reset: boolean;
  reverse: boolean;
  step: boolean;
  touched: boolean;
  type: string;
  valid: boolean;
  value: string;
  spellCheck: boolean;
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
      iconComponent,
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
        ref={ref}
        id={id}
        className={inputStyle}
        type={type}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        hidden={hidden}
        minLength={minLength}
        maxLength={maxLength}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        min={min}
        max={max}
        step={step}
        autoCorrect={autoCorrect}
        spellCheck={spellCheck}
        autoComplete={autoComplete}
        aria-required={required}
        aria-label={label && label}
        aria-hidden={type === 'hidden'}
        data-qa={dataQa}
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
  spellCheck: PropTypes.bool,
};

Input.defaultProps = {
  autoComplete: undefined,
  autoCorrect: undefined,
  className: undefined,
  iconComponent: undefined,
  id: undefined,
  dataQa: '',
  disabled: false,
  error: '',
  helper: '',
  hidden: false,
  label: '',
  reverse: false,
  touched: true,
  valid: false,
  value: '',
  indicator: undefined,
  max: undefined,
  min: undefined,
  maxLength: undefined,
  minLength: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  required: false,
  reset: false,
  step: undefined,
  spellCheck: false,
};

export default Input;
