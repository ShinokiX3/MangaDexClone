import React, { useMemo, useState } from 'react';
import FilterItems from '../../../SharedUI/Filter/FilterItems';
import Select from '../../../SharedUI/StyledComponents/Select/Select';
import { strToUpper } from '../../../Utils/stringToUpperCase';
import styles from './filter-titles.module.scss'

const FilterModal = ({ tags = [] }) => {    
    const [appliedFilters, setAppliedFilters] = useState(['One, Two, Three, Four, Five']);
    
    const specificTags = useMemo(() => [
        { type: 'Demographic', tags: ['Shounen', 'Shoujo', 'Seinen', 'Josei', 'None'] }, 
        { type: 'Content Rating', tags: ['Safe', 'Suggestive', 'Erotica'] },
        { type: 'Publication Status', tags: ['Ongoing', 'Completed', 'Hiatus', 'Cancelled'] }
    ], [])

    return (
        <div className={styles.modal_wrapp}>
            <h1>Filters</h1>
            <div className={styles.applied}>
                <p>Applied filters</p>
                <div></div>
            </div>
            <div className={styles.controls}>
                <div className={styles.first_button}><button>Search</button></div>
                <div className={styles.second_button}><button>Reset Filters</button></div>
            </div>
            <div className={styles.select}>
                <p>Original Language</p>
                <Select values={['']} />
            </div>
            <Tags tags={specificTags} isFlexBox />
            <Tags tags={tags} />
        </div>
    );
};

const Tags = ({ tags = [], isFlexBox = false }) => {
    return (
        <div className={styles.tags} style={isFlexBox ? {display: 'flex'} : {}} >
            {tags.map(tag => {
                return (
                    <div className={styles.tag}>
                        <h3>{strToUpper(tag.type)}</h3>
                        <FilterItems items={tag.tags} />
                    </div>
                )
            })}
        </div>
    )
}

export default FilterModal;