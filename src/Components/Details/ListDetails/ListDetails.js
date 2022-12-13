import React from 'react';
import styles from '../details.module.scss';

const ListDetails = ({ children }) => {
    return (
        <>
        {children.map(child => 
        <div className={styles.list}>
            {child}
        </div>
        )} 
        </>
    );
};

export default ListDetails;