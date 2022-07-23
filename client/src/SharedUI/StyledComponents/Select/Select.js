import { memo, useRef, useState } from 'react';
import { SelectIcon } from '../../../Assets/Svg/Form';
import styles from './select.module.scss';

const Select = memo(({ values = [], selected, setSelected, selectTitle = '' }) => {
    const refSelect = useRef(null);

    const handleSelect = () => {
        refSelect.current.classList.toggle(styles.active);
    }

    const handleSelected = (val) => {
        setSelected(val);
    }

    // TODO: Create multiply select

    return (
        <div ref={refSelect} className={styles.wrapp} onClick={handleSelect}>
            <div className={styles.select}>
                <p className={styles.title}>{selectTitle}</p>
                <p className={`${styles.selected} ${!selectTitle ? styles.centered : ''}`}>{selected}</p>
                <SelectIcon />
                <div className={styles.content}>
                    {
                        values.map(val => (
                            <div onClick={() => handleSelected(val)}>{val}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
});

export default Select;