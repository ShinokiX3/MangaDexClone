import React from 'react';
import styles from './cancelbutton.module.scss';

const PassiveButton = ({ title = 'Cancel', handle }) => {
    return <button onClick={handle} className={styles.default}>{title}</button>
};

export default PassiveButton;