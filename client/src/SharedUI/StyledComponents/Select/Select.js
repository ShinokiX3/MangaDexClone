import { memo, useRef, useState } from 'react';
import styles from './select.module.scss';

const Select = memo(({ values = [], selected, setSelected }) => {
    const refSelect = useRef(null);

    const handleSelect = () => {
        refSelect.current.classList.toggle(styles.active);
    }

    const handleSelected = (val) => {
        setSelected(val);
    }

    return (
        <div ref={refSelect} className={styles.wrapp} onClick={handleSelect}>
            <div className={styles.select}>
                <p className={styles.title}>Sort By</p>
                <p className={styles.selected}>{selected}</p>
                <svg data-v-20f285ec="" data-v-46b7d13b="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron ml-1 flex-shrink-0 feather feather-chevron-down text-icon-black dark:text-icon-white text-false icon my-4"><path data-v-20f285ec="" d="m6 9 6 6 6-6"></path></svg>
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