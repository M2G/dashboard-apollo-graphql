import type { JSX } from 'react';
import DateCell from 'components/Core/Table/DateCell';
import type { ITableStaticCol } from 'components/Core/Table/TableStaticCol';
import TableStaticCol from 'components/Core/Table/TableStaticCol';
import IconNames from 'components/Core/Icon/Icons.types';
import type { Maybe, User } from 'modules/graphql/generated';

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
  canEdit,
}: IUserListItem): (
  | {
      display: Date | Maybe<number> | string | undefined;
      value: Date | number | string | null | undefined;
    }
  | { display: JSX.Element }
)[] {
  console.log('userListItem', user);

  const id = `user__row__${rowId}__${user.id}`;

  const actions: any = [];

  if (canEdit) {
    actions.push({
      action: (): void => {
        onEdit(user);
      },
      icon: IconNames.EDIT,
      id: `${id}__edit`,
      label: IconNames.EDIT,
    });
  }

  if (canDelete) {
    actions.push({
      action: (): void => {
        onDelete(user);
      },
      icon: IconNames.DELETE,
      id: `${id}__delete`,
      label: IconNames.DELETE,
    });
  }

  const tableStaticColProps: ITableStaticCol = {
    actions,
    id,
    label,
  };

  return [
    {
      display: <TableStaticCol {...tableStaticColProps} />,
    },
    {
      display: user?.first_name,
      value: user?.first_name,
    },
    {
      display: user?.last_name,
      value: user?.last_name,
    },
    {
      display: user?.email,
      value: user?.email,
    },
    {
      display: <DateCell date={user?.created_at} />,
      value: new Date(user?.created_at as number),
    },
    {
      display: <DateCell date={user?.modified_at} />,
      value: new Date(user?.modified_at as number),
    },
  ];
}

export default userListItem;
