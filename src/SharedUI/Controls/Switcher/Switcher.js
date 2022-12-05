import React from 'react';
import styles from './switcher.module.scss';
import Button from '../Button/Button';

const Switcher = ({ children }) => {
    return (
        <div className={styles.wrapp}>
            <div><Button title="<" bgColor="#f0f1f2" /></div>
            <div className={styles.content}>
                { children }
            </div>
            <div><Button title=">" bgColor="#f0f1f2" /></div>
        </div>
    );
};

export default Switcher;