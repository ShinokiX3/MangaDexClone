import React, { useMemo } from 'react';
import styles from './loading-wrapp.module.scss';

const LoadingWrapp = ({ height, width }) => {
    const customStyles = useMemo(() => (
        {
            height: height, 
            width: width, 
            backgroundColor: '#f0f1f2', 
            boxShadow: '0px 0px 30px 2px rgba(34, 60, 80, 0.12)'
        }
    ), [width, height]) 

    return (
        <div className={styles.loading_wrapp} style={customStyles}>
            <div className={styles.loading_animation_block}></div>
        </div>
    );
};

export default LoadingWrapp;