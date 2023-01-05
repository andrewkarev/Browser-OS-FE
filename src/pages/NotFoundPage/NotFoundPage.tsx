import React from 'react';
import Container from 'components/Container';
import styles from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router-dom';
import AppPaths from 'common/routes';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <span className={styles.titleText}>Error - 404</span>
          </h1>
          <h2 className={styles.subtitle}>An error has occurred, to continue:</h2>
          <p className={styles.text}>* Restart the application.</p>
          <p className={styles.text}>* Send us an e-mail about this error and try later.</p>
          <nav className={styles.nav}>
            <button className={styles.link} type="button" onClick={() => navigate(AppPaths.HOME)}>
              Restart
            </button>
            &nbsp;|&nbsp;
            <button className={styles.link} type="button">
              Send report
            </button>
          </nav>
        </div>
      </div>
    </Container>
  );
};

export default NotFoundPage;
