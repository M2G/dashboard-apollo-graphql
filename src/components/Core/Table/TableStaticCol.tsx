/*eslint-disable*/
import Action from 'components/Core/Table/Action';

interface ITableStaticCol {
  actions: [
    {
      id: string;
      action: (params: any) => {};
      icon: string;
      iconType: string;
      name: string;
      family: string;
    },
  ];
  id?: string;
  label?: string;
}

function TableStaticCol({ id, label, actions }: ITableStaticCol) {
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
