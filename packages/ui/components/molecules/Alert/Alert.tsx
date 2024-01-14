import { AnyComponent } from '@types';
import PropTypes from 'prop-types';
import { HTMLAttributes, ReactNode, useState } from 'react';

import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import { ReactComponent as DangerIcon } from '../../../assets/icons/danger.svg';
import { ReactComponent as InfoIcon } from '../../../assets/icons/info.svg';
import { ReactComponent as ValidIcon } from '../../../assets/icons/valid.svg';
import { ReactComponent as WarningIcon } from '../../../assets/icons/warning.svg';
import { Icon } from '../../atoms';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode | string;
  closable?: boolean;
  size?: 'regular' | 'small';
  tag?: 'div';
  type?: 'danger' | 'info' | 'success' | 'warning';
}

export const Icons = {
  danger: DangerIcon,
  info: InfoIcon,
  success: ValidIcon,
  warning: WarningIcon,
};

export const AlertVariants = {
  danger: 'bg-danger-surface text-danger',
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
 * @param tag - The tag to use for the component.
 * @param type - The type of the alert.
 * @param children - The content of the alert.
 * @param closable - Whether the alert is closable.
 *
 * @returns {JSX.Element}
 */
function Alert({
  children,
  closable = true,
  size = 'regular',
  tag = 'div',
  type = 'info',
  ...rest
}: AlertProps) {
  const [show, setShow] = useState<boolean>(true);
  const DynamicTag = tag || (`${tag}` as keyof AnyComponent);

  return (
    <DynamicTag
      {...rest}
      className={[
        'items-centner relative hidden min-w-[70px] justify-between px-3 py-4 tracking-wide',
        AlertVariants[type],
        AlertSizes[size],
        rest.className,
        show && '_:inline-flex',
      ].join(' ')}>
      <Icon
        as={Icons[type]}
        className="min-w-5 mr-4 mt-0.5 h-5 max-h-5 w-5 text-current"
      />
      <p className="text-variants-80 mb-0 w-full">{children}</p>
      {closable && (
        <button
          className={[
            '-mr2 relative -mt-2 ml-4 -translate-y-[1px]',
            'hover:bg-secondary/5 rounded bg-transparent p-2 text-current transition-colors',
          ].join(' ')}
          onClick={(ev) => {
            ev.preventDefault();
            setShow(false);
          }}>
          <Icon
            as={CloseIcon}
            className="_:min-w-4 _:w-4 h-4 max-h-4 text-black"
          />
        </button>
      )}
    </DynamicTag>
  );
}

export default Alert;

Alert.propTypes = {
  children: PropTypes.string.isRequired,
  closable: PropTypes.bool,
  size: PropTypes.oneOf(['regular', 'small']),
  tag: PropTypes.string,
  type: PropTypes.oneOf(['danger', 'info', 'success', 'warning']),
};
