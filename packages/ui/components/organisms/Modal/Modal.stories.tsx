import ModalWrapper from '@/components/Core/Modal/ModalWrapper';
import { useState } from 'react';

export default {
  component: ModalWrapper,
  title: 'ModalWrapper',
};

function Template(args: any) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpened(!isOpened);
        }}>
        OK
      </button>
      <ModalWrapper
        title="test"
        onConfirm={() => {}}
        isShowing={isOpened}
        hide={() => {
          setIsOpened(false);
        }}>
        <div>Test</div>
      </ModalWrapper>
    </>
  );
}

export const Default: any = Template.bind({});
Default.args = [{}];
