import React from 'react';
import styles from './spinner.module.scss';

const Spinner = ({ customStyle = {} }) => {
    return (
        <div className={styles.wrapp}>
            <div className={styles.spinner} style={customStyle}>

            </div>
        </div>
    );
};

export default Spinner;