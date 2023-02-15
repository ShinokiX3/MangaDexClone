import React from 'react';
import styles from './addbutton.module.scss';

const ActiveButton = ({ title = 'Add', handle }) => {
    return <button onClick={handle} className={styles.default}>{title}</button>
};

export default ActiveButton;