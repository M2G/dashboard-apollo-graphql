/*eslint-disable*/
import Icon from 'components/Core/Icon';
import styles from './Table.module.scss';

interface IAction {
  actions: [{
    id: string;
    action: (params: any) => {}
    icon: string;
    iconType: string;
  }];
}

function Action({ actions }: IAction) {
  return <>
    {actions?.map(({ id, action, icon, iconType = 'fas', name, family }: any) =>
      <div key={`actionCol__${id}`} className={styles.action}>
        <div id={id} onClick={action}>
          <Icon name={name} family={family} className={`${iconType} ${icon}`} />
        </div>
      </div>
    )}
  </>
}

export default Action;
