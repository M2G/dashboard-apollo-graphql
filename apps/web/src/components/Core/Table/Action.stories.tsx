import Action from './Action';

export default {
  title: 'Action',
  component: Action,
};

const Template = (args: any) => Action({ ...args });

export const Default: any = Template.bind({});
Default.args = {
  actions: [
    {
      id: 'test0',
      label: 'edit',
      icon: 'fa-edit',
      action: () => {},
    },
    {
      id: 'test1',
      label: 'remove',
      icon: 'fa-remove',
      action: () => {},
    },
  ],
};
