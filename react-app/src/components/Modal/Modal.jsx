
import React from 'react';
import style from './Modal.module.css';

function Modal({ children, visible, setVisible }) {
  const rootClasses = [style.myModal];

  if (visible) {
    rootClasses.push(style.active)
  }

  return (
    <div className={rootClasses.join(' ')} onMouseDown={() => setVisible(null)}>
      <div className={style.myModalContent} onMouseDown={(event => event.stopPropagation())}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
