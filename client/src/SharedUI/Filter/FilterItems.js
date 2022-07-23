import React, { useEffect, useRef, useState } from 'react';
import styles from './filter-items.module.scss';

const FilterItems = ({ items, isSpecific = false }) => {
    const [values, setValues] = useState([]);
    
    const refAny = useRef(null);

    useEffect(() => {
        console.log(values);   
    });
    
    const handleClick = (e) => {
        if (!values.some((val) => val.value === e.target.innerHTML) || values.length === 0) {
            setValues([...values, {status: 'include', value: e.target.innerHTML}]);
            e.target.classList.add(styles.include);
        }
        if (values.some((val) => val.value === e.target.innerHTML && val.status === 'include') && values.length > 0) {
            const index = values.findIndex((val) => val.value === e.target.innerHTML);
            const newObj = {status: 'exclude', value: values[index].value};
            setValues([...values.slice(0, index), newObj, ...values.slice(index + 1)]);
            e.target.classList.remove(styles.include);
            e.target.classList.add(styles.exclude);
        }
        if (values.some((val) => val.value === e.target.innerHTML && val.status === 'exclude') && values.length > 0) {
            const index = values.findIndex((val) => val.value === e.target.innerHTML);
            setValues([...values.slice(0, index), ...values.slice(index + 1)]);
            e.target.classList.remove(styles.exclude);
        }
    }

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
            {items.map(item => {
                return (
                    <span className={styles.exemplar} onClick={handleClick} >
                        {item?.attributes?.name?.en ?? item}
                    </span>
                )
            })}
            {isSpecific ? 
                <span ref={refAny} className={`${styles.exemplar} ${values.length === 0 ? `${styles.any}` : ``}`}>
                    {"Any"}
                </span>
                :
                null
            }
        </div>
    );
};

export default FilterItems;