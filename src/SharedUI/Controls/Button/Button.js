import React from 'react';
import styles from './button.module.scss';

const Button = ({ title, bgColor = '#f0f1f2', color = 'black' }) => {
    return (
        <button className={styles.button} 
            style={{backgroundColor: bgColor, color: color}}>{title}</button>
    );
};

export default Button;