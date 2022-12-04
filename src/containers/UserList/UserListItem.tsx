/*eslint-disable*/
import DateCell from 'components/Core/Table/DateCell';
import TableStaticCol, {
  ITableStaticCol
} from 'components/Core/Table/TableStaticCol';
import IconNames from 'components/Core/Icon/Icons.types';
import { User } from 'graphql/generated';

export interface IUserListItem {
  id: string;
  user: any;
  label: any;
  onEdit: (user: User) => any;
  onDelete: (user: User) => any;
  canDelete: boolean | undefined;
  canEdit: boolean | undefined;
}

function userListItem({
  id: rowId,
  user,
  label,
  onEdit,
  onDelete,
  canDelete,
  canEdit
}: IUserListItem): (
  | { display: JSX.Element }
  | { display: JSX.Element; value: Date }
)[] {
  const id = `user__row__${rowId}__${user._id}`;

  const actions = [];

  if (canEdit) {
    actions.push({
      label: 'Edit',
      icon: IconNames.EDIT,
      id: `${id}__edit`,
      action: () => {
        onEdit(user);
      }
    });
  }

  if (canDelete) {
    actions.push({
      label: 'Delete',
      icon: IconNames.DELETE,
      id: `${id}__delete`,
      action: () => {
        onDelete(user);
      }
    });
  }

  const tableStaticColProps: ITableStaticCol = {
    // @ts-ignore
    actions,
    id,
    label
  };

  return [
    {
      display: <TableStaticCol {...tableStaticColProps} />
    },
    {
      display: user?.first_name,
      value: user?.first_name
    },
    {
      display: user?.last_name,
      value: user?.last_name
    },
    {
      display: user?.email,
      value: user?.email
    },
    {
      display: <DateCell date={user?.created_at} />,
      value: new Date(user?.created_at)
    },
    {
      display: <DateCell date={user?.modified_at} />,
      value: new Date(user?.modified_at)
    }
  ];
}

export default userListItem;
