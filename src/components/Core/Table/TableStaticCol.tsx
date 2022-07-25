/*eslint-disable*/
import Action from 'components/Core/Table/Action';
import { string } from 'prop-types';

interface TableStaticColInterface {
  actions: any[];
  id: string;
  label: string;
}

function TableStaticCol({ id, label, actions }: TableStaticColInterface) {
  return <div className="tableStaticCol">
      <div className="ml-3 actions">
        <div className="labelHandler">
          <label id={id}>{label}</label>
        </div>
        <div className="actionBar">
          {actions?.length > 0 && <Action actions={actions} />}
        </div>
      </div>
    </div>
}

TableStaticCol.propTypes = {
  actions: Action.propTypes.actions,
  id: string.isRequired,
  label: string.isRequired,
};

export default TableStaticCol;
