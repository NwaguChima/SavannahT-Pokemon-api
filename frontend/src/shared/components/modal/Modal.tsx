import { type ReactNode } from 'react';
import styles from './Modal.module.scss';
import { CloseIcon } from '@/assets/icons';
import { usePreventDocumentScroll } from '@/shared/hooks/usePreventDocumentScroll';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Modal = ({ isOpen, onClose, children, size = 'md' }: ModalProps) => {
  usePreventDocumentScroll({ isOpen });

  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div
        className={`${styles.modal__content} ${
          styles[`modal__content--${size}`]
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modal__close} onClick={onClose}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
