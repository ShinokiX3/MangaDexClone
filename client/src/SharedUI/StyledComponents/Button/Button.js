import React from 'react';
import styles from './button.module.scss'

const Button = ({ children, customStyles = {}, disable = false }) => {
    return (
        <button className={disable ? styles.disable : styles.initial} style={customStyles}>
            { children }
        </button>
    );
};

export default Button;