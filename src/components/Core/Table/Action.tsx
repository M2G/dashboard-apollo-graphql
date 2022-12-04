import Icon from 'components/Core/Icon';
import type IconNames from 'components/Core/Icon/Icons.types';
import styles from './Table.module.scss';

interface IAction {
  actions: [
    {
      id: string;
      action: (params: any) => {};
      icon?: string;
    },
  ];
}

function Action({ actions }: IAction): JSX.Element[] | undefined {
  return actions?.map(({ id, action, icon }) => (
    <div key={`actionCol__${id}`} className={styles.action}>
      <div aria-hidden="true" id={id} onClick={action}>
        {icon && <Icon icon={icon as IconNames} />}
      </div>
    </div>
  ));
}

export default Action;
