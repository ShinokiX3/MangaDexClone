import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterItems from '../../../SharedUI/Filter/FilterItems';
import FilterItemsViev from '../../../SharedUI/Filter/FilterItemsViev';
import Select from '../../../SharedUI/StyledComponents/Select/Select';
import { fetchFilteredData, setSelectedTags } from '../../../Store/Slices/titlesSlice';

import styles from './filter-titles.module.scss';
import stylesFilter from '../../../SharedUI/Filter/filter-items.module.scss';

import Tags from './Tags';

const FilterModal = ({ tags = [], setActive }) => {
    const [langSelect, setLangSelect] = useState(['All Languages']);
    
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

    // TODO: create other way to compose, or function that will be compiling these tags values

    const handleSearch = () => {
        const includeIds = [];
        const excludeIds = [];

        const pubDemographic = [];
        const rating = [];
        const status = []; 

        selectedTags.forEach(el => {
            el.tags.forEach(tag => {
                if (tag?.status === 'include' && tag?.id) {
                    includeIds.push(tag?.id);
                }
                if (tag?.status === 'exclude' && tag?.id) {
                    excludeIds.push(tag?.id);
                }
            })
            if (el.type === 'Demographic') {
                pubDemographic.push(...el.tags.map(tag => tag.value.toLowerCase()));
            }
            if (el.type === 'Content Rating') {
                rating.push(...el.tags.map(tag => tag.value.toLowerCase()));
            }
            if (el.type === 'Publication Status') {
                status.push(...el.tags.map(tag => tag.value.toLowerCase()));
            }
        })
        
        dispatch(fetchFilteredData({includeIds, excludeIds, pubDemographic, rating, status}));
        setActive(false);
    }

    const handleReset = () => {
        const includeIds = [];
        const excludeIds = [];

        const pubDemographic = [];
        const rating = [];
        const status = []; 

        dispatch(fetchFilteredData({includeIds, excludeIds, pubDemographic, rating, status}));
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
                <p>Original Language</p>
                <Select values={['Other', 'Something']} selected={langSelect} setSelected={setLangSelect} />
            </div>
            <Tags tags={specificTags} isFlexBox />
            <Tags tags={tags} />
        </div>
    );
};

export default FilterModal;