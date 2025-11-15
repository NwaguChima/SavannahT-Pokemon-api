import { type InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = ({ label, error, icon, className, ...props }: InputProps) => {
  const inputClasses = classNames(
    styles.input,
    {
      [styles['input--error']]: error,
      [styles['input--with-icon']]: icon,
    },
    className
  );

  return (
    <div className={styles['input-wrapper']}>
      {label && <label className={styles.input__label}>{label}</label>}
      <div className={styles['input-container']}>
        {icon && <span className={styles.input__icon}>{icon}</span>}
        <input className={inputClasses} {...props} />
      </div>
      {error && <span className={styles.input__error}>{error}</span>}
    </div>
  );
};

export default Input;
