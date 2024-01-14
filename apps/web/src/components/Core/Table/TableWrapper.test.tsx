/*eslint-disable*/
import { render, screen, fireEvent } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import TableWrapper from 'components/Core/Table/TableWrapper';
import DateCell from 'components/Core/Table/DateCell';
import TableStaticCol from 'components/Core/Table/TableStaticCol';

const listItem = ({
  id: rowId,
  label,
  user,
  onEdit,
  onDelete,
  canDelete,
  canEdit
}: any) => {
  const id = `user__row__${rowId}__${user.id}`;

  const actions = [];

  if (canEdit) {
    actions.push({
      label: 'Edit',
      icon: 'fa-edit',
      id: `${id}__edit`,
      action: () => {
        onEdit(user);
      }
    });
  }

  if (canDelete) {
    actions.push({
      label: 'Delete',
      icon: 'fa-remove',
      id: `${id}__delete`,
      action: () => {
        onDelete(user);
      }
    });
  }

  const tableStaticColProps: any = {
    id,
    actions,
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
};

describe('test TableStaticCol', () => {
  const header = [
    { label: '', sortable: false },
    { label: 'First name', sortable: false },
    { label: 'Last name', sortable: false },
    { label: 'Email', sortable: false },
    {
      label: 'Created at',
      sortable: true,
      type: 'date'
    },
    { label: 'Modified at', sortable: true, type: 'date' }
  ];

  const createdAt = new Date().getTime();

  const d = new Date();
  const addDays = d.setDate(d.getDate() + 7);
  const modifiedAt = new Date(addDays).getTime();

  const USER_1: any = {
    _id: faker.datatype.uuid(),
    created_at: createdAt,
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    modified_at: modifiedAt
  };

  const USER_2: any = {
    _id: faker.datatype.uuid(),
    created_at: null,
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    modified_at: null
  };

  const users: any = [
    {
      _id: USER_1._id,
      created_at: USER_1.created_at,
      email: USER_1.email,
      first_name: USER_1.first_name,
      last_name: USER_1.last_name,
      modified_at: USER_1.modified_at
    },
    {
      _id: USER_2._id,
      created_at: USER_2.created_at,
      email: USER_2.email,
      first_name: USER_2.first_name,
      last_name: USER_2.last_name,
      modified_at: USER_2.modified_at
    }
  ];

  const canDelete = true;
  const canEdit = true;
  const onEdit = jest.fn();
  const onDelete = jest.fn();
  const id = faker.datatype.uuid();

  const rows = users?.map((user: any) =>
    listItem({
      id,
      user,
      onEdit,
      onDelete,
      canDelete,
      canEdit
    })
  );

  test('should render', () => {
    const { container } = render(
      <TableWrapper id={id} header={header} rows={rows} />
    );
    const faEdit: any = container?.querySelector('.fa-edit');
    const faRemove: any = container?.querySelector('.fa-remove');

    fireEvent.click(faEdit);
    fireEvent.click(faRemove);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);

    expect(screen.getByText(USER_1.first_name)).toBeInTheDocument();
    expect(screen.getByText(USER_1.last_name)).toBeInTheDocument();
    expect(screen.getByText(USER_1.email)).toBeInTheDocument();
    expect(
      screen.getByText(new Date(USER_1.created_at * 1000).toLocaleDateString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(new Date(USER_1.modified_at * 1000).toLocaleDateString())
    ).toBeInTheDocument();

    expect(screen.getByText(USER_2.first_name)).toBeInTheDocument();
    expect(screen.getByText(USER_2.last_name)).toBeInTheDocument();
    expect(screen.getByText(USER_2.email)).toBeInTheDocument();
  });

  test('should not render', () => {});
});
