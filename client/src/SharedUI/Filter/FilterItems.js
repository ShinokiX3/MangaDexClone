import React from 'react';
import styles from './filter-items.module.scss';

const FilterItems = ({ items }) => {
    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {items.map(item => {
                return (
                    <span className={styles.exemplar}>
                        {item?.attributes?.name?.en ?? item}
                    </span>
                )
            })}
        </div>
    );
};

export default FilterItems;