import React, { useEffect, useState } from 'react';
import styles from './loading-wrapp.module.scss';

const LoadingWrapp = ({ height, width }) => {
    // const [params, setParams] = useState({height, width});
    // useEffect(() => {
    //     if (parentRef) {
    //         setParams({
    //             height: parentRef.offsetHeight,
    //             width: parentRef.offsetWidth
    //         });
    //         // parentRef.width
    //         // console.log(parentRef.offsetWidth);
    //     }
    // }, [parentRef]);
    return (
        <div className={styles.loading_wrapp} style={{backgroundColor: '#f0f1f2', height: height, width: width}}>
            <div className={styles.loading_animation_block}></div>
        </div>
    );
};

export default LoadingWrapp;