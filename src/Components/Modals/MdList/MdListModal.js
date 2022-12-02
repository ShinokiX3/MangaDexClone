import React from 'react';
import styles from './mdlist.module.scss';

const MdListModal = ({ active, setActive }) => {
    return (
        <>
        <p className={styles.title}>Add to List</p>
            <div className={styles.content}>
                <div className={styles.list}>Lists...</div>
                <button className={styles.newlistbutton}><p className={styles.addlist}>+</p> Create new list</button>
                <div className={styles.controls}>
                    <button className={styles.cancelbutton}>Cancel</button>
                    <button className={styles.addbutton}>Save</button>
                </div>
            </div>
        </>
    );
};

export default MdListModal;