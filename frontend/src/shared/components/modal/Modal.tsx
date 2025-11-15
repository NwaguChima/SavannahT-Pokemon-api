import type { ReactNode } from 'react';
import styles from './Modal.module.scss';
import Button from '../button/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Modal = ({ isOpen, onClose, children, size = 'md' }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div
        className={`${styles.modal__content} ${
          styles[`modal__content--${size}`]
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Button className={styles.modal__close} onClick={onClose}>
          ✕
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
