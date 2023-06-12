import type { ComponentType, SVGAttributes } from 'react';

enum IconNames {
  DELETE = 'Delete',
  EDIT = 'Edit',
}

export type IconComponent = ComponentType<SVGAttributes<SVGElement>>;

export default IconNames;
