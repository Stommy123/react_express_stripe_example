import React from 'react';
import { Portal } from 'react-portal';

const Modal = ({ children, isOpen, header }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className='payment-modal modal-backdrop'>
        <div className='modal-wrapper'>
          <div className='modal-header'>
            <h3>{header}</h3>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
