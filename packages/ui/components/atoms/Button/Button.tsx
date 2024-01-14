import { AnyComponent } from '@types';

import PropTypes from 'prop-types';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: AnyComponent;
  isLoading?: boolean;
  size?: 'regular' | 'small';
  variant?: 'primary' | 'secondary';
}

export const ButtonVariants = {
  primary: [
    'min-w-[176px] text-white text-md border !border-primary bg-primary font-display',
    'active:bg-primary-active active:border-primary-active',
    'hover:bg-primary-hover hover:border-primary-hover',
    'disabled:text-white/[.5] disabled:bg-primary-disabled disabled:border-primary-disabled disabled:hover:text-white/[.5] disabled:hover:bg-primary-disabled disabled:border-primary-disabled',
    'hover:disabled:text-white/[.5] hover:disabled:bg-primary-disabled hover:disabled:border-primary-disabled hover:disabled:border-primary-disabled',
  ].join(' '),
};

/**
 * Sizes of the button
 */
export const ButtonSizes = {
  regular: '_:px-4 _:py-[8px] min-h-[48px] text-md',
  small: '_:px-4 _:py-1.5 min-h-[34px]',
};

/**
 * Versatile button component that can be used as a link or a button
 *
 * @param {string} tag - The tag or component to use
 * @param {string} children - The content specified between the tags
 * @param {string} variant - The variant of the button
 * @param {string} size - The size of the button
 * @param {string} icon - The icon to display
 * @param {boolean} isLoading - Override icon and content to show a loading spinner
 *
 * @returns {JSX.Element}
 */
function Button({
  children,
  icon,
  size = 'regular',
  tag = 'button',
  variant = 'primary',
  ...rest
}: ButtonProps) {
  const DynamicTag = tag || (`${tag}` as keyof AnyComponent);

  return (
    <DynamicTag
      {...rest}
      className={[
        'inline-flex cursor-pointer items-center justify-center rounded',
        'text-left font-semibold',
        'disabled:cursor-not-allowed',
        'transition-colors',
        ButtonVariants[variant],
        ButtonSizes[size],
        rest.className,
      ].join(' ')}
      disabled={rest.disabled}>
      {children}
    </DynamicTag>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.any,
  isLoading: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'regular']),
  tag: PropTypes.any,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

export default Button;
