import type { ComponentType, SVGAttributes } from 'react';

enum IconNames {
  DELETE = 'Delete',
  EDIT = 'Edit',
}

// eslint-disable-next-line
export type IconComponent = ComponentType<SVGAttributes<SVGElement>>;

export default IconNames;
