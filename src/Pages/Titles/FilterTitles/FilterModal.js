import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';         
import { resetSelectedTags, setSelectedTags } from '../../../Store/Slices/titlesSlice';
import styles from './filter-titles.module.scss';

import FilterItemsViev from '../../../SharedUI/Filter/FilterItemsViev';
import filterStyles from '../../../SharedUI/Filter/filter-items.module.scss'
import stylesFilter from '../../../SharedUI/Filter/filter-items.module.scss';
import Tags from './Tags';

const FilterModal = ({ tags = [], setActive }) => {
    const specificTags = useMemo(() => [
        { type: 'Demographic', tags: ['Shounen', 'Shoujo', 'Seinen', 'Josei', 'None'] }, 
        { type: 'Content Rating', tags: ['Safe', 'Suggestive', 'Erotica'] },
        { type: 'Publication Status', tags: ['Ongoing', 'Completed', 'Hiatus', 'Cancelled'] }
    ], [])

    const dispatch = useDispatch();
    const selectedTags = useSelector(state => state.title.selectedTags.data);

    const handleDelete = (e) => {
        const targetValue = e.target.innerHTML;
        const dataToChange = {title: '', type: '', index: ''};
        
        selectedTags.forEach((el, elIdx) => {
            const idx = el.tags.findIndex(tag => tag.value === targetValue);
            if (idx !== -1) {
                dataToChange.title = el.type;
                dataToChange.type = elIdx;
                dataToChange.index = idx;
            }
        })

        const newObj = {
            type: dataToChange.title,
            tags: [
                ...selectedTags[dataToChange.type].tags.slice(0, dataToChange.index),
                ...selectedTags[dataToChange.type].tags.slice(dataToChange.index + 1)
            ]
        }

        const elems = document.querySelectorAll(`#${targetValue.split(' ').join('-')}`);
        
        elems[elems.length - 1].classList.remove(stylesFilter.include); 
        elems[elems.length - 1].classList.remove(stylesFilter.exclude);
        dispatch(setSelectedTags(newObj));
    }

    const handleSearch = () => {
        setActive(false);
    }

    const handleReset = () => {
        const tags = document.querySelectorAll('.filter-tag');
        tags.forEach(el => { 
            el.classList.remove(filterStyles.exclude); 
            el.classList.remove(filterStyles.include);
            el.classList.remove('filter-tag');
        })

        dispatch(resetSelectedTags());
    }
    
    return (
        <div className={styles.modal_wrapp}>
            <h1>Filters</h1>
            <div className={styles.applied}>
                <p style={{marginBottom: '10px'}}>Applied Filters</p>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {selectedTags?.map(tag => (
                        tag.tags.map(item => {
                            return (
                                <FilterItemsViev 
                                    key={item.value}
                                    title={item.value} 
                                    include={item.status === 'include'} 
                                    exclude={item.status === 'exclude'} 
                                    handleClick={handleDelete}
                                />
                            )
                        })
                    ))
                    }
                </div>
            </div>
            <div className={styles.controls}>
                <div className={styles.first_button}><button onClick={handleSearch}>Search</button></div>
                <div className={styles.second_button}><button onClick={handleReset}>Reset Filters</button></div>
            </div>
            <hr style={{margin: '0.25rem 0px', borderTop: '1px solid #e5e7eb'}}></hr>
            <div className={styles.select}>
                {/* <p>Original Language</p> */}
            </div>
            <Tags tags={specificTags} isFlexBox />
            <Tags tags={tags} />
        </div>
    );
};

export default FilterModal;