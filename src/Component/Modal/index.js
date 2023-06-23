import React from 'react';

import { IoMdClose } from 'react-icons/io';

import './style.css';

function Modal({ show, handleShowModal, children, modalTitle }) {
  const showHideClass = show
    ? 'custom-modal display-modal'
    : 'custom-modal close-modal';
  return (
    <div className={showHideClass} onClick={handleShowModal}>
      <section className="modal-main" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5 className="modal-title">{modalTitle}</h5>
          <button className="btn" onClick={handleShowModal}>
            <IoMdClose />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </section>
    </div>
  );
}

export default Modal;
