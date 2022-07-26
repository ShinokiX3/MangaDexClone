import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FilterItems from '../../../SharedUI/Filter/FilterItems';
import styles from './filter-titles.module.scss';

const Tags = ({ tags = [], isFlexBox = false }) => {

    return (
        <div className={styles.tags} style={isFlexBox ? {display: 'flex'} : {}} >
            {tags?.map(tag => {
                return (
                    <div className={styles.tag}>
                        <FilterItems items={tag.tags} isSpecific={isFlexBox} type={tag.type} />
                    </div>
                )
            })}
        </div>
    )
}

export default Tags;