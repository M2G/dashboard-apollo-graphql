import PropTypes from 'prop-types';
import { SVGProps, useMemo } from 'react';

import type IconNames from './Icons.types';

import Icons from './Icons';
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
function Icon({ as, ...rest }: IconProps): JSX.Element {
  const DynamicIcon = useMemo(
    () => Icons?.[as || (`${as}` as IconNames)],
    [as],
  );
  return (
    <DynamicIcon
      {...rest}
      className={['min-w-4 min-h-4 h-4 w-4 fill-current', rest.className].join(
        ' ',
      )}
    />
  );
}

export default Icon;

Icon.propTypes = {
  as: PropTypes.any.isRequired,
};
