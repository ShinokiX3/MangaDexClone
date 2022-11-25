import React from 'react';
import styles from './errormodal.module.scss';

const ErrorModal = ({ error = {} }) => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.statuscode}>{error.code}</h2>
            <p className={styles.details}>{error.details}</p>
        </div>
    );
};

export default ErrorModal;