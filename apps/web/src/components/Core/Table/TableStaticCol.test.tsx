/*eslint-disable*/
import { render } from '@testing-library/react';
import TableStaticCol from './TableStaticCol';

describe('test TableStaticCol', () => {
  test('should render', () => {
    const actions = [];
    actions.push({
      action: () => {},
      icon: 'fa-edit',
      id: `test__edit`,
      label: 'Edit'
    });
    const tableStaticColProps: any = {
      actions,
      id: 'test_id',
      label: 'test'
    };

    const { container } = render(
      <TableStaticCol
        actions={tableStaticColProps.actions}
        id={tableStaticColProps.id}
        label={tableStaticColProps.label}
      />
    );

    expect(container).toHaveTextContent('test');
    const tableStaticCol = container.querySelector('.tableStaticCol');
    const action = container.querySelector('.actions');
    const labelHandler = container.querySelector('.labelHandler');
    const testId = container.querySelector('#test_id');
    const actionBar = container.querySelector('.actionBar');
    const actionButton = container.querySelector('.c-action_button');
    const idEdit = container.querySelector('#test__edit');
    const faEdit = container.querySelector('.fas.fa-edit');

    expect(tableStaticCol).toBeInTheDocument();
    expect(action).toBeInTheDocument();
    expect(labelHandler).toBeInTheDocument();
    expect(testId).toBeInTheDocument();
    expect(actionBar).toBeInTheDocument();
    expect(actionButton).toBeInTheDocument();
    expect(idEdit).toBeInTheDocument();
    expect(idEdit).toBeInTheDocument();
    expect(faEdit).toBeInTheDocument();
  });

  test('should not render', () => {
    /*   const args = {
      currentSortedData: null,
      isSortable: false,
      label: "",
      onSort: () => {},
    };

    const { container } = render(<TableHeaderCell
      label={args.label}
      isSortable={args.isSortable}
      currentSortedData={args.currentSortedData}
      onSort={args.onSort}
    />);
    expect(container).toHaveTextContent(""); */
  });
});
