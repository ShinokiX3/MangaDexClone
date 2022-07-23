import React from 'react';
import styles from './button.module.scss'

const Button = ({ children, customStyles = {} }) => {
    return (
        <button className={styles.initial} style={customStyles}>
            { children }
        </button>
    );
};

export default Button;