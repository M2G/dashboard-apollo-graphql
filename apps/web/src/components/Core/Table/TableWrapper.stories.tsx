import Icon from '@/components/Core/Icon';
import { actions } from '@/fixtures/action';
import IconNames from '@/components/Core/Icon/Icons.types';
import DateCell from './DateCell';
import TableStaticCol from './TableStaticCol';
import TableWrapper from './TableWrapper';

export default {
  title: 'TableWrapper',
  component: TableWrapper,
};

const Template = (args: any) => <TableWrapper {...args} />;

const headerRow = [
  { label: 'Table Static Col', sortable: false },
  {
    label: 'Publication Date',
    sortable: true,
    type: 'date',
    defaultSort: true,
  },
  { label: 'Test2', sortable: true },
  { label: 'Test3' },
  { label: 'Test4' },
  { label: 'Test5' },
];

const dateTable: any = [
  new Date(Date.now()),
  new Date(Date.now() - 3600000 * 25),
  new Date(Date.now() - 3600000 * 2),
  new Date(Date.now() - 3600000 * 90),
];

export const Default: any = Template.bind({});

Default.args = {
  id: 'test',
  header: headerRow,
  rows: [
    [
      { display: <div style={{ color: 'blue' }}>Row1</div>, value: 'Row1' },
      { display: dateTable[0].toLocaleString(), value: dateTable[0] },
      { display: 'Row1', value: 'Row1' },
      { display: 'Row1', value: 'Row1' },
      { display: 'Row1', value: 'Row1' },
      { display: 'Row1', value: 'Row1' },
    ],
    [
      { display: <div style={{ color: 'blue' }}>Row1</div>, value: 'Row1' },
      { display: dateTable[1].toLocaleString(), value: dateTable[1] },
      { display: 'qsdqsd', value: 'qsdqsd' },
      { display: 'qsdqsd', value: 'qsdqsd' },
      { display: 'qsdqsd', value: 'qsdqsd' },
      { display: 'qdsqsd', value: 'qsdqsd' },
    ],
    [
      { display: <div style={{ color: 'blue' }}>Row1</div>, value: 'Row1' },
      { display: 'azeaze', value: dateTable[2] },
      { display: 'Row2', value: 'Row2' },
      { display: 'azeaze', value: 'azeaze' },
      { display: 'Row1', value: 'Row1' },
      { display: 'Row1', value: 'Row1' },
    ],
    [
      { display: <div style={{ color: 'blue' }}>Row1</div>, value: 'Row1' },
      { display: dateTable[3].toLocaleString(), value: dateTable[3] },
      { display: 'ttttt', value: 'ttttt' },
      { display: 'Row1', value: 'Row1' },
      { display: 'fffff', value: 'fffff' },
      { display: 'Row1', value: 'Row1' },
    ],
  ],
  columnsWidth: [4, 2, 2, 2, 2, 2],
};

export const WithStaticBlock: any = Template.bind({});

const tableStaticBlockProps: any = (n: number) => ({
  actions,
  nbMaxActions: 3,
  id: `tableWrapper__${n}`,
  label:
    n === 0
      ? "This is a very long label supposed to crop because it's a very long paragraph containing lots of words"
      : 'This is a label',
});

const getArray = (size: any) => new Array(size).fill('*');

const generateTable = (nbRows: number, nbCols: number) =>
  getArray(nbRows).map((e, index) =>
    getArray(nbCols).map((e2, indexCol) => {
      if (indexCol === 0)
        return {
          display: <TableStaticCol {...tableStaticBlockProps(index)} />,
          value: '',
        };
      if (indexCol === 1)
        return {
          display: <DateCell date={dateTable[index]} />,
          value: dateTable[index],
        };
      if (indexCol === 3) {
        return {
          display: <Icon icon={IconNames.DELETE} className={''} />,
          value: '',
        };
      }
      return {
        display: `Row ${index + 1}, Col ${indexCol + 1}`,
        value: `Row ${index + 1}, Col ${indexCol + 1}`,
      };
    }),
  );

WithStaticBlock.args = {
  id: 'testWithStaticCol',
  header: headerRow,
  rows: generateTable(4, 6),
  columnsWidth: [4, 1, 1, 1, 1, 1],
};
