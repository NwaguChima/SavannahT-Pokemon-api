import { usePreventDocumentScroll } from '@/shared/hooks/usePreventDocumentScroll';
import Button from '../button/Button';
import styles from './ConfirmationModal.module.scss';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmationModalProps) => {
  usePreventDocumentScroll({ isOpen });

  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onCancel}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>{title}</h2>
        </div>

        <div className={styles.modal__body}>
          <p className={styles.modal__message}>{message}</p>
        </div>

        <div className={styles.modal__footer}>
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
