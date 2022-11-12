/*eslint-disable*/
import DateCell from 'components/Core/Table/DateCell';
import TableStaticCol from 'components/Core/Table/TableStaticCol';

const userListItem = ({
  id: rowId,
  user,
  label,
  onEdit,
  onDelete,
  canDelete,
  canEdit,
}: any) => {
  const id = `user__row__${rowId}__${user._id}`;

  const actions = [];

  if (canEdit) {
    actions.push({
      label: 'Edit',
      icon: 'fa-edit',
      id: `${id}__edit`,
      action: () => {
        onEdit(user);
      },
    });
  }

  if (canDelete) {
    actions.push({
      label: 'Delete',
      icon: 'fa-remove',
      id: `${id}__delete`,
      action: () => {
        onDelete(user);
      },
    });
  }

  const tableStaticColProps = {
    id,
    actions,
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
      value: new Date(user?.created_at),
    },
    {
      display: <DateCell date={user?.modified_at} />,
      value: new Date(user?.modified_at),
    },
  ];
};

export default userListItem;
