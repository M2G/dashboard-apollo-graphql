import type { ComponentType, SVGAttributes } from 'react';

enum IconNames {
  ARROW_DOWN = 'arrow-down',
  ARROW_UP = 'arrow-up',
  CONCERT = 'concert',
  DELETE = 'delete',
  EDIT = 'edit',
  HOME = 'home',
  PROFIL = 'profil',
  PROFILS = 'profils',
}

export type IconComponent = ComponentType<SVGAttributes<SVGElement>>;

export default IconNames;
