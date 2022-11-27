/*eslint-disable*/
import getRandomId from 'utils/general';
import TableStaticCol from './TableStaticCol';

export default {
  title: 'TableStaticCol',
  component: TableStaticCol
};

const Template = (args: any) => <TableStaticCol {...args} />;

export const Default: any = Template.bind({});

Default.args = {
  id: 'tableStaticCol',
  actions: [
    {
      label: 'click',
      icon: 'pencil',
      id: getRandomId(),
      action: () => {}
    },
    {
      label: 'comment',
      icon: 'comment-text',
      id: getRandomId(),
      action: () => {}
    },
    {
      label: 'open in new',
      icon: 'open-in-new',
      id: getRandomId(),
      action: () => {}
    },
    {
      label: 'stop',
      icon: 'square',
      id: getRandomId(),
      action: () => {}
    },
    {
      label: 'delete',
      icon: 'trash',
      iconType: 'dripicons',
      id: getRandomId(),
      action: () => {}
    },
    {
      label: 'yolo',
      icon: 'plus',
      id: getRandomId(),
      action: () => {}
    }
  ],
  label: 'This is a block'
};
