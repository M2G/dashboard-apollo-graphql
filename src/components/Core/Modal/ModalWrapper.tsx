/*eslint-disable*/
import PropTypes from 'prop-types';
import Portal from 'components/Core/Portal/Portal';
import './index.scss';
import { MouseEventHandler } from 'react';

interface ModalProps {
  id?: string;
  isShowing: boolean;
  hide: MouseEventHandler<HTMLButtonElement>;
  onConfirm: any;
  title: string;
  children: any;
}

function Modal({ id, isShowing, hide, title, onConfirm, children }: ModalProps) {
  return isShowing ? (
    <Portal id={id}>
      <div className="c-modal-overlay">
        <div className="c-modal-wrapper">
          <div className="c-modal modal-content rounded-4 shadow">
              <div className="modal-header border-bottom-0">
                <h5 className="modal-title">{title}</h5>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={hide} />
              </div>
              <div className="modal-body py-0">
                {children}
              </div>
              <div className="modal-footer flex-column border-top-0">
                <button type="button" className="btn btn-lg btn-primary w-100 mx-0 mb-2" onClick={onConfirm}>
                  Confirmer
                </button>
                <button type="button" className="btn btn-lg btn-light w-100 mx-0" data-bs-dismiss="modal" onClick={hide}>
                  Close
                </button>
              </div>
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
}

function ModalWrapper({ id, isShowing, hide, title, onConfirm, children }: any) {
  return <Modal id={id} isShowing={isShowing} hide={hide} title={title} onConfirm={onConfirm}>{children}</Modal>
}

ModalWrapper.propTypes = {
  id: PropTypes.string,
  isShowing: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
};

export default ModalWrapper;
