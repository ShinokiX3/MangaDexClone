import React, { useState } from 'react';
import styles from './combobox.module.scss';

const Combobox = ({ title, array }) => {
    const [refWrappBlock, setRefWrappBlock] = useState(null);
    const [refElemsBlock, setRefElemsBlock] = useState(null);

    const handleCombobox = () => {
        if (refElemsBlock) {
            refElemsBlock.classList.toggle(styles.elems_block_active);
            refWrappBlock.classList.toggle(styles.checked);
        }
    }

    return (
        <div ref={setRefWrappBlock} className={styles.wrapp} onClick={() => handleCombobox()}>
            {title}
            <div ref={setRefElemsBlock} className={styles.elems_block}>
                <div>1</div>
            </div>
        </div>
    );
};

export default Combobox;