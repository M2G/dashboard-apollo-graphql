/*eslint-disable*/
import { render } from '@testing-library/react';
import Action from './Action';

const actions: any = [
  {
    action: () => {},
    family: 'fa-edit',
    icon: 'edit',
    iconType: 'fas',
    id: 'test',
    label: 'click',
    name: 'test'
  }
];

describe('test action', () => {
  test('should render', () => {
    const { container }: any = render(Action({ actions }) as any);
    const div = container.querySelector('#test');
    const fa = container.querySelector('.fa-edit');
    expect(div).toBeInTheDocument();
    expect(fa).toBeInTheDocument();
  });
});
