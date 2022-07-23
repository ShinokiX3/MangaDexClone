import { useMemo, useState } from 'react';
import Select from '../../../SharedUI/StyledComponents/Select/Select';
import styles from './filter-titles.module.scss';
import Tags from './Tags';

const FilterModal = ({ tags = [] }) => {
    const [selected, setSelected] = useState(['All Languages']);
    
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
                <Select values={['Other', 'Something']} selected={selected} setSelected={setSelected} />
            </div>
            <Tags tags={specificTags} isFlexBox />
            <Tags tags={tags} />
        </div>
    );
};

export default FilterModal;