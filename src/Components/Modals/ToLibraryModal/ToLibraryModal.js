import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAddToList from '../../../Hooks/addToList';
import Select from '../../../SharedUI/StyledComponents/Select/Select';
import { filterSomeAttribute } from '../../../Utils/filterAttribute';
import styles from './tolibrarymodal.module.scss';

const readingStatusList = [
    {name: 'Reading', value: 'reading'},
    {name: 'On Hold', value: 'on_hold'},
    {name: 'Dropped', value: 'dropped'},
    {name: 'Plan to Read', value: 'plan_to_read'},
    {name: 'Completed', value: 'completed'},
    {name: 'Re-Reading', value: 're_reading'},
]

const ToLibraryModal = ({ setStatus, setActive }) => {
    const [selected, setSelected] = useState('Reading');
    const mangaInfo = useSelector(state => state.manga.mangaInfo);

    const addToList = useAddToList(mangaInfo.data.id);

    const mangaCover = useMemo(() => {
        return `https://uploads.mangadex.org/covers/${mangaInfo.data.id}/${filterSomeAttribute(mangaInfo.data.relationships, 'cover_art').attributes.fileName}`;
    }, [mangaInfo]);

    const handleAddToList = () => {
        addToList(selected);
        setStatus(selected.name);
        setActive(false);
    }

    return (
        <>
        <p className={styles.modalname}>Add to library</p>
        <div className={styles.wrapper}>
            <div className={styles.coverwrapper}>
                <img className={styles.cover} src={mangaCover} alt="manga" />
                <h3 className={styles.title + ' ' + styles.titlemobile}>{mangaInfo.data.attributes.title.en}</h3>
            </div>
            <div className={styles.details}>
                <h3 className={styles.title}>{mangaInfo.data.attributes.title.en}</h3>
                <p style={{color: '#242424', fontWeight: 'bolder'}}>Reading Status</p>
                <div className={styles.selectors}>
                    <Select values={readingStatusList} selected={selected} setSelected={setSelected} selectTitle='Reading Status' customStyles={{height: '22px', maxWidth: '65%'}} />
                    <button className={styles.addbutton}>
                        <svg data-v-20f285ec="" data-v-022ca1a5="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-currentColor icon"><path data-v-20f285ec="" d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h9m6.63-4A17.888 17.888 0 0 1 18 8m-4.27 13a2 2 0 0 1-3.46 0M17 18l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </button>
                </div>
            </div>
        </div>
        <div className={styles.resolvestatus}>
            <button onClick={handleAddToList} className={styles.addbutton + ' ' + styles.addstatus}>
                <p>Add</p>
            </button>
        </div>
        </>
    );
};

export default ToLibraryModal;