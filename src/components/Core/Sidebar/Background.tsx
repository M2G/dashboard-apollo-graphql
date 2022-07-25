import classnames from 'classnames';

function Background({ show, setIsOpened }: any) {
  return <div
    aria-hidden="true"
    className={classnames('background', show ? 'is-active' : '')}
    onClick={() => setIsOpened(false)}
  />;
}

export default Background;
