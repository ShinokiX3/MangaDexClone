import React, { useState } from 'react';
import styles from './switcher.module.scss';
import Button from '../Button/Button';

const Switcher = ({ children }) => {
    // const childrenWithProps = React.Children.map(children, child => {
    //     if (React.isValidElement(child)) {
    //       return React.cloneElement(child, { doSomething });
    //     }
    //     return child;
    // });
    const [switchStatus, setSwitchStatus] = useState(0);
    const handleSwitch = (switchTo) => {
        setSwitchStatus();
    }
    return (
        <div className={styles.wrapp}>
            <div><Button title="<" bgColor="#f0f1f2" /></div>
            <div className={styles.content}>
                {
                    children
                }
            </div>
            <div><Button title=">" bgColor="#f0f1f2" /></div>
        </div>
    );
};

export default Switcher;