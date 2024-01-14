import type { IconComponent } from './Icons.types';
import IconNames from './Icons.types';
import { ReactComponent as IconBin } from '../../../assets/icons/bin.svg';
import { ReactComponent as IconPencil } from '../../../assets/icons/pencil.svg';
import { ReactComponent as IconArrowUp } from '../../../assets/icons/arrow-up.svg';
import { ReactComponent as IconArrowDown } from '../../../assets/icons/arrow-down.svg';
import { ReactComponent as IconHome } from '../../../assets/icons/home.svg';
import { ReactComponent as Profil } from '../../../assets/icons/profil.svg';
import { ReactComponent as Profils } from '../../../assets/icons/profils.svg';

const Icons: {
  [key in IconNames]: IconComponent;
} = {
  [IconNames.DELETE]: IconBin as unknown as IconComponent,
  [IconNames.EDIT]: IconPencil as unknown as IconComponent,
  [IconNames.ARROW_DOWN]: IconArrowDown as unknown as IconComponent,
  [IconNames.ARROW_UP]: IconArrowUp as unknown as IconComponent,
  [IconNames.HOME]: IconHome as unknown as IconComponent,
  [IconNames.PROFIL]: Profil as unknown as IconComponent,
  [IconNames.PROFILS]: Profils as unknown as IconComponent,
};

export default Icons;
