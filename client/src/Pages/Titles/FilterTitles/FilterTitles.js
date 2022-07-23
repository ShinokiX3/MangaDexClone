import React, { useState } from 'react';
import styles from './filter-titles.module.scss';
import useInput from '../../../Hooks/input';
import Modal from '../../../Features/Modal/Modal';
import FilterModal from './FilterModal';

// TODO: perhaps create united component for Titles & Suggestion page controls 
// Modal, that will be create for filter search, take to wrapp React Lazy, and when the modal closed don't load it's on the page   

const FilterTitles = ({ tags = [] }) => {
    const [active, setActive] = useState(false);
    const filterInput = useInput('');

    const handleModal = () => {
        setActive(!active);
    }

    // memo(({active, setActive, children, styleModal = {}, styleModalContent = {}, modalContentAdd = ''})

    return (
        <>
        <div className={styles.wrapp}>
            <div>
                <input type="text" 
                    className="search-block search-input" 
                    placeholder='Search' 
                    {...filterInput} 
                />
            </div>
            <div onClick={handleModal} style={{cursor: 'pointer'}} >
                <svg data-v-20f285ec="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-icon-black dark:text-icon-white text-false icon" data-v-6b3fd699=""><path data-v-20f285ec="" d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <p>Filter</p>
            </div>
        </div>
        <Modal active={active} setActive={setActive} styleModalContent={{width: '90vw', borderRadius: '0px'}} >
            <FilterModal tags={tags} />
        </Modal>
        </>
    );
};

export default FilterTitles;