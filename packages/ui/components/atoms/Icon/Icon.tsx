import { SVGProps, useMemo } from 'react';

import Icons from './Icons';
import type IconNames from './Icons.types';

export interface IconProps extends SVGProps<SVGElement> {
  as: IconNames;
}

/**
 * Wrapper for icon components to set the default styles
 * and assign currrent colors dynamically
 *
 * @param {IconProps} props
 * @returns {JSX.Element}
 *
 * @example
 * import { ReactComponent as PlusIcon } from "../../../assets/icons";
 * <Icon as={PlusIcon} />
 * */
function Icon({ as, ...rest }: IconProps): JSX.Element | null {
  const DynamicIcon = useMemo(
    () => Icons?.[as || (`${as}` as IconNames)],
    [as],
  );

  if (!DynamicIcon) return null;

  return (
    <DynamicIcon
      {...rest}
      className={[
        'min-w-4 min-h-4 h-4 w-4 stroke-current',
        rest.className,
      ].join(' ')}
    />
  );
}

export default Icon;
