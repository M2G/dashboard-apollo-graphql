import Action from 'components/Core/Table/Action';
import type IconNames from 'components/Core/Icon/Icons.types';

export interface ITableStaticCol {
  actions: [
    {
      id: string;
      action: () => void;
      icon: IconNames | undefined;
    },
  ];
  id?: string | undefined;
  label?: string | undefined;
}

function TableStaticCol({ id, label, actions }: ITableStaticCol): JSX.Element {
  return (
    <div className="tableStaticCol">
      <div className="ml-3 actions">
        {label && (
          <div className="labelHandler">
            <label id={id}>{label}</label>
          </div>
        )}
        <div className="actionBar">
          {actions?.length > 0 && Action({ actions })}
        </div>
      </div>
    </div>
  );
}

export default TableStaticCol;
