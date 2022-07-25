/*eslint-disable*/
import { string, func, arrayOf, shape } from 'prop-types';
import Icon from 'components/Core/Icon';

function Action({ actions }: any) {
  return <>
      {actions?.map(({ id, action, icon, iconType = 'fas', name, family }: any) =>
        <div key={`actionCol__${id}`} className="c-action_button">
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
