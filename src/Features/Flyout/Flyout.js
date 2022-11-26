import React from 'react';
import styles from './flyout.module.scss';

const Flyout = ({ setShouldShow, children }) => {
    return (
        <div onMouseOver={() => setShouldShow(true)} onMouseOut={() => setShouldShow(false)} className={styles.wrapper} >
            <div className={styles.content}>
                { children }
            </div>
        </div>
    );
};

export default Flyout;