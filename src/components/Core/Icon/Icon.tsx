import type { JSX, SVGAttributes } from 'react';
import { useMemo } from 'react';

import type IconNames from 'components/Core/Icon/Icons.types';
import Icons from 'components/Core/Icon/Icons';

interface IconProps extends SVGAttributes<SVGElement> {
  className?: string;
  icon: IconNames;
  size?: number;
}

function Icon({ className, icon, size }: IconProps): JSX.Element {
  const SVGIcon = useMemo(() => Icons?.[icon], [icon]);
  return <SVGIcon className={className} height={size} width={size} />;
}

export default Icon;
