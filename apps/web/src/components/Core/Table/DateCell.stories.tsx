import DateCell from './DateCell';

export default {
  component: DateCell,
  title: 'DateCell',
};

const Template = (args: any) => <DateCell {...args} />;

export const Default: any = Template.bind({});
Default.args = {
  date: new Date().toISOString(),
};
