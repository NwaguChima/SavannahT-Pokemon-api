import styles from './Loader.module.scss';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'pokeball' | 'pikachu' | 'pulse';
}

const Loader = ({ size = 'md', text, variant = 'pokeball' }: LoaderProps) => {
  return (
    <div className={styles.loader}>
      {variant === 'pokeball' && (
        <div
          className={`${styles.loader__spinner} ${
            styles[`loader__spinner--${size}`]
          }`}
        >
          <div className={styles.pokeball}>
            <div className={styles.pokeball__top}></div>
            <div className={styles.pokeball__bottom}></div>
            <div className={styles.pokeball__button}>
              <div className={styles.pokeball__inner}></div>
            </div>
          </div>
        </div>
      )}

      {variant === 'pikachu' && (
        <div
          className={`${styles.loader__pikachu} ${
            styles[`loader__pikachu--${size}`]
          }`}
        >
          <div className={styles.pikachu}>⚡</div>
        </div>
      )}

      {variant === 'pulse' && (
        <div
          className={`${styles.loader__pulse} ${
            styles[`loader__pulse--${size}`]
          }`}
        >
          <div className={styles.pulse}>
            <div className={styles.pulse__ring}></div>
            <div className={styles.pulse__ring}></div>
            <div className={styles.pulse__ring}></div>
          </div>
        </div>
      )}

      {text && <p className={styles.loader__text}>{text}</p>}
    </div>
  );
};

export default Loader;
