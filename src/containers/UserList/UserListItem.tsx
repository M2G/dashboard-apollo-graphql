/*eslint-disable*/
import DateCell from 'components/Core/Table/DateCell';
import TableStaticCol, {
  ITableStaticCol
} from 'components/Core/Table/TableStaticCol';
import IconNames from 'components/Core/Icon/Icons.types';
import { Maybe, User } from 'graphql/generated';

export interface IUserListItem {
  id: string;
  user: User;
  label: string;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
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
  | {
      display: Maybe<number> | string | Date | undefined;
      value: number | string | Date | null | undefined;
    }
)[] {
  const id = `user__row__${rowId}__${user._id}`;

  const actions = [];

  if (canEdit) {
    actions.push({
      label: IconNames.EDIT,
      icon: IconNames.EDIT,
      id: `${id}__edit`,
      action: (): void => {
        onEdit(user);
      }
    });
  }

  if (canDelete) {
    actions.push({
      label: IconNames.DELETE,
      icon: IconNames.DELETE,
      id: `${id}__delete`,
      action: (): void => {
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
      value: new Date(user?.created_at as number)
    },
    {
      display: <DateCell date={user?.modified_at} />,
      value: new Date(user?.modified_at as number)
    }
  ];
}

export default userListItem;
