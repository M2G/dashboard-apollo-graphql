import TableHeaderCell from './TableHeaderCell';

export default {
  component: TableHeaderCell,
  title: 'TableHeaderCell',
};

function Template(args: any) {
  const data = Object.assign([], args);
  return data?.map(({ label, sortable, type }: any, index: string) => (
    <TableHeaderCell
      key={index}
      label={label}
      isSortable={sortable}
      currentSortedData={false}
      onSort={() => {}}
    />
  ));
}

export const Default: any = Template.bind({});
Default.args = [
  {
    label: '',
    sortable: false,
  },
  {
    label: 'First name',
    sortable: false,
  },
  {
    label: 'Last name',
    sortable: false,
  },
  {
    label: 'Email',
    sortable: false,
  },
  {
    label: 'Created at',
    sortable: true,
    type: 'date',
  },
  {
    label: 'Modified at',
    sortable: true,
    type: 'date',
  },
];
