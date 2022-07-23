import styles from './sort-titles.module.scss';
import Select from '../../../SharedUI/StyledComponents/Select/Select';
import CardControls from '../../../Features/Cards/CardControls';
import { useMemo, useState } from 'react';

const SortTitles = () => {
    const [selected, setSelected] = useState('Best Match');
    const [ref, setRef] = useState(null);

    const sortValues = useMemo(() => [
        'Best Match',
        'Latest Upload',
        'Oldest Upload',
        'Title Ascending',
        'Title Descending',
        'Highest Rating',
        'Lowest Rating',
        'Most Follows',
        'Fewest Follows',
        'Recently Added',
        'Oldest Added',
        'Year Ascending',
        'Year Descending'
    ], [])

    const handleControl = () => {
        
    }

    return (
        <div className={styles.wrapp}>
            <div>
                <Select values={sortValues} selected={selected} setSelected={setSelected} />
            </div>
            <div>
                <CardControls setRefControls={setRef} handleControls={handleControl}  />
            </div>
        </div>
    );
};

export default SortTitles;