import { render } from '@testing-library/react';
import IconNames from 'components/Core/Icon/Icons.types';
import Icon from './Icon';

describe('test DateCell', () => {
  test('should render', () => {
    const { container } = render(
      <Icon icon={IconNames.DELETE} className="test" />,
    );
    // eslint-disable-next-line
    const id: any = container?.querySelector('.mdi.mdi-phone');
    expect(id).toBeInTheDocument();
  });
});
