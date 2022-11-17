/*eslint-disable*/
import { string, func, arrayOf, shape } from 'prop-types';
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

const actionType = shape({
  id: string.isRequired,
  action: func.isRequired,
  icon: string.isRequired,
  iconType: string,
});

Action.propTypes = {
  actions: arrayOf(actionType),
};

export default Action;
