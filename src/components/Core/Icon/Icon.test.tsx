/*eslint-disable*/
import { render } from '@testing-library/react';
import Icon from './Icon';

describe('test DateCell', () => {
  test('should render', () => {
    const { container } = render(<Icon name="phone" family="mdi" />);
    const id: any = container?.querySelector('.mdi.mdi-phone');
    expect(id).toBeInTheDocument();
  });
});
