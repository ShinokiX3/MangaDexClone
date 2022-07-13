import React, { useEffect, useState } from 'react';
import styles from './loading-wrapp.module.scss';

const LoadingWrapp = ({ height, width }) => {
    return (
        <div className={styles.loading_wrapp} style={{backgroundColor: '#f0f1f2', height: height, width: width}}>
            <div className={styles.loading_animation_block}></div>
        </div>
    );
};

export default LoadingWrapp;