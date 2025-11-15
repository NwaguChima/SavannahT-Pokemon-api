import styles from './Loader.module.scss';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const Loader = ({ size = 'md', text }: LoaderProps) => {
  return (
    <div className={styles.loader}>
      <div
        className={`${styles.loader__spinner} ${
          styles[`loader__spinner--${size}`]
        }`}
      >
        <div className={styles.pokeball}>
          <div className={styles.pokeball__button}></div>
        </div>
      </div>
      {text && <h3 className={styles.loader__text}>{text}</h3>}
    </div>
  );
};

export default Loader;
