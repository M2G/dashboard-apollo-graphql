import { AnyComponent } from '@types';
import { HTMLAttributes, ReactNode } from 'react';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode | string;
  size?: 'regular' | 'small';
  tag?: 'div';
  type?: 'danger' | 'info' | 'success' | 'warning';
}

export const AlertVariants = {
  danger: 'bg-danger-surface text-danger _:fill-danger',
  info: 'bg-info-surface text-info',
  success: 'bg-success-surface text-success',
  warning: 'bg-warning-surface text-warning',
};

export const AlertSizes = {
  regular: 'px-4 py-4',
  small: 'px-4 py-2.5',
};

/**
 * A component to display a message to the user.
 *
 * @param size
 * @param tag - The tag to use for the component.
 * @param type - The type of the alert.
 * @param children - The content of the alert.
 * @param closable - Whether the alert is closable.
 *
 * @param rest
 * @returns {JSX.Element}
 */
function Alert({
  children,
  size = 'regular',
  tag = 'div',
  type = 'info',
  ...rest
}: AlertProps) {
  const DynamicTag = tag || (`${tag}` as keyof AnyComponent);

  return (
    <DynamicTag
      {...rest}
      className={[
        'items-centner relative hidden min-w-[70px] justify-between px-3 py-4 tracking-wide _:inline-flex',
        AlertVariants[type],
        AlertSizes[size],
        rest.className,
      ].join(' ')}>
      <span className="text-variants-80 mb-0 w-full">{children}</span>
    </DynamicTag>
  );
}

export default Alert;
