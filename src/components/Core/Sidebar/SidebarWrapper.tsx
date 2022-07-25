/*eslint-disable*/
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Background from './Background';
import './index.scss';

function Sidebar({ show, setIsOpened, children }: any) {
  return <div className={classnames('sidebar', show ? 'is-active' : '')}>
      <div className="sidebar-wrapper">
        <div
          role="button"
          className="close-icon"
          onClick={() => setIsOpened(false)}>
          <span />
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
}

function SidebarWrapper({ isOpened, setIsOpened, children }: any) {
  return <>
      <Background show={isOpened} setIsOpened={setIsOpened} />
      <Sidebar show={isOpened} setIsOpened={setIsOpened}>
        {children}
      </Sidebar>
    </>
}

SidebarWrapper.propTypes = {
  isOpened: PropTypes.bool,
  setIsOpened: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default SidebarWrapper;
