/*eslint-disable*/
import Action from 'components/Core/Table/Action';

interface TableStaticColInterface {
  actions: [{ id: string; action: (params: any) => {}; icon: string; iconType: string; }];
  id?: string;
  label?: string;
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

export default TableStaticCol;
