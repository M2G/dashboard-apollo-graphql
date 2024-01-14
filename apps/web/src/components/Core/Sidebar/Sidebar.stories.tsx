/*eslint-disable*/
import { useState } from 'react';
import SidebarWrapper from 'components/Core/Sidebar/SidebarWrapper';

export default {
  component: SidebarWrapper,
  title: 'SidebarWrapper',
};

function Template(args: any) {
  const [isOpened, setIsOpened] = useState(false);

  console.log('isOpened', isOpened);

  return (
    <>
      <button onClick={() => setIsOpened(!isOpened)}>OK</button>
      <SidebarWrapper isOpened={isOpened} setIsOpened={setIsOpened}>
        <div>Test</div>
      </SidebarWrapper>
    </>
  );
}

export const Default: any = Template.bind({});
Default.args = [{}];
