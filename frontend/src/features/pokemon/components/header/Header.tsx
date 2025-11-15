import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <h1 className={styles.header__title}>Pokédex</h1>
          <p className={styles.header__subtitle}>Gotta Catch 'Em All!</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
