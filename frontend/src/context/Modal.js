import './Modal.css';

import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { setServerFormPage } from '../store/ui';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function ServerToolTip({ top, onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div 
      className="server-tooltip" 
      onMouseEnter={onClose}
      style={{top: top}}
    >
      {children}
    </div>,
    modalNode
  );
}

export function ActionToolTip({ top, left, onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div 
      className="action-tooltip" style={{top: top, left: left}}
      onMouseEnter={onClose}
    >
      {children}
    </div>,
    modalNode
  );
}

export function NavToolTip({ top, left, onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div 
      className="nav-tooltip" style={{top: top, left: left}}
      onMouseEnter={onClose}
    >
      {children}
    </div>,
    modalNode
  );
}

export function TimeToolTip({ top, left, onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div 
      className="time-tooltip" style={{top: top, left: left}}
      onMouseEnter={onClose}
    >
      {children}
    </div>,
    modalNode
  );
}

export function ServerFormModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal-form">
      <div id="modal-form-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}