import React from 'react';
import styles from './spinner.module.scss';

const Spinner = ({ customStyle = {}, wrappStyles = {} }) => {
    return (
        <div className={styles.wrapp} style={wrappStyles}>
            <div className={styles.spinner} style={customStyle}></div>
        </div>
    );
};

export default Spinner;