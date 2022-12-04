import type { SVGAttributes } from 'react';
import { useMemo } from 'react';
import Icons from 'components/Core/Icon/Icons';
import type IconNames from 'components/Core/Icon/Icons.types';

interface IconProps extends SVGAttributes<SVGElement> {
  icon: IconNames;
  size: number;
  className: string;
}

function Icon({ className, icon, size }: IconProps): JSX.Element {
  const SVGIcon = useMemo(() => Icons[icon], [icon]);
  return <SVGIcon width={size} height={size} className={className} />;
}

export default Icon;
