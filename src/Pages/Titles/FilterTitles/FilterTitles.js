import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../../Store/Slices/titlesSlice';
import styles from './filter-titles.module.scss';

import useInput from '../../../Hooks/input';
import useDebounce from '../../../Hooks/debounce';
import useFetchByFilters from '../Hooks/useFetchByFilters';

import Modal from '../../../Features/Modal/Modal';
import FilterModal from './FilterModal';

// TODO: perhaps create united component for Titles & Suggestion page controls 
// Modal, that will be create for filter search, take to wrapp React Lazy, and when the modal closed don't load it's on the page   

const FilterTitles = memo(({ tags = [] }) => {
    const [active, setActive] = useState(false);

    const dispatch = useDispatch();
    const filteredData = useSelector(state => state.title.filteredData.load);
    const title = useSelector(state => state.title.title.data);

    const filterInput = useInput('');
    const fetchByFilters = useFetchByFilters();
    const debouncedValue = useDebounce(filterInput.value, 1000, true);

    useEffect(() => {
        if (filteredData.status === 'resolved') {
            dispatch(setSearchValue(debouncedValue));
        }
    }, [debouncedValue]);

    useEffect(() => {
        if (filteredData.status === 'resolved' && active === false) {
            fetchByFilters();
        }
    }, [active])

    useEffect(() => {
        if (filteredData.status === 'resolved' && active === false) {
            fetchByFilters();
        }
    }, [title]);

    const handleModal = () => {
        setActive(!active);
    }

    return (
        <>
        <div className={styles.wrapp}>
            <div style={{width: '100%', marginRight: '15px'}}>
                <input type="text" 
                    className="search-block search-input" 
                    placeholder='Search' 
                    style={{paddingLeft: '15px'}}
                    {...filterInput} 
                />
            </div>
            <div onClick={handleModal} style={{cursor: 'pointer'}} >
                <svg data-v-20f285ec="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-icon-black dark:text-icon-white text-false icon" data-v-6b3fd699=""><path data-v-20f285ec="" d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <p>Filter</p>
            </div>
        </div>
        
        <Modal active={active} setActive={setActive} styleModalContent={{width: '87vw', borderRadius: '0px'}} >
            <FilterModal tags={tags} setActive={setActive} />
        </Modal>
        </>
    );
});

export default FilterTitles;