import type { IconComponent } from 'components/Core/Icon/Icons.types';
import IconNames from 'components/Core/Icon/Icons.types';
import IconBin from 'assets/icons/bin.svg';
import IconPencil from 'assets/icons/pencil.svg';

const Icons: {
  [key in IconNames]: IconComponent;
} = {
  [IconNames.DELETE]: IconBin as unknown as IconComponent,
  [IconNames.EDIT]: IconPencil as unknown as IconComponent,
};

export default Icons;
