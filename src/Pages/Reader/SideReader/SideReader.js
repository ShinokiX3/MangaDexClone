import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setReaderStatus } from '../../../Store/Slices/menuSlice';
import './side-reader.scss';

import LinkList from '../../../SharedUI/Form/LinkList';
import Select from '../../../SharedUI/StyledComponents/Select/Select';

const SideReader = ({ data, handleChapter, currentChapter, mangaTitle, currImg, maxImg, handleImage }) => {
    const [selected, setSelected] = useState('');
    const [pageSelected, setPageSelected] = useState();

    const [pages, setPages] = useState();
    const [chapters, setChapters] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            const chapters = [];

            for (let volume in data) {
                const chaptersNames = Object.keys(data[volume].chapters);
                for (let ch in data[volume].chapters) {
                    const name = 'Volume ' + volume + ' Ch. ' + ch;
                    const idx = chaptersNames.indexOf(ch) + 1;

                    const chapter = {
                        volume: volume,
                        chapter: ch,
                        counter: idx,
                        name: name
                    }

                    chapters.push(chapter);
                }
            }
            setChapters(chapters);
        }
    }, [data]);

    useEffect(() => {
        if (maxImg) {
            const pages = Array.from({length: maxImg}, ((_, i) => { return {name: i + 1} }));
            setPages(pages);
        }
    }, [maxImg])

    useEffect(() => {
        if (selected) {
            handleChapter(selected.volume, selected.chapter, selected.counter);
        }
    }, [selected]);

    useEffect(() => {
        if (pageSelected) {
            handleImage(pageSelected.name);
        }
    }, [pageSelected]);

    return (
        <div className="side-chapter-wrapp" style={{backgroundColor: 'white', minWidth: '250px'}}>
            <div className="side-chapter-utils">
                <div onClick={() => dispatch(setReaderStatus(false))}>
                    <svg data-v-20f285ec="" data-v-6b3fd699="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-currentColor icon"><path data-v-20f285ec="" d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
                <div>
                    <svg data-v-20f285ec="" data-v-6b3fd699="" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-currentColor icon"><path data-v-20f285ec="" d="m3 21 5-5m2-6-1 1s-2-2-5 1l8 8c3-3 1-5 1-5l1-1M1 1l22 22m-6-12 2-2h2l-6-6v2l-2 2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                </div>
            </div>
            <div className="sd-ch-links">
                <div>
                    <LinkList ico={<svg data-v-20f285ec="" data-v-79551784="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-book-open text-icon-black dark:text-icon-white text-false icon"><path data-v-20f285ec="" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>} 
                        title={mangaTitle} isSvg={true}></LinkList>
                </div>
                <div>
                    <LinkList ico={<svg data-v-20f285ec="" data-v-79551784="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-icon-black dark:text-icon-white text-false icon"><path data-v-20f285ec="" d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path data-v-20f285ec="" d="M13 2v7h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
                        title={`Chapter ${currentChapter.chapter}`} isSvg={true} />
                </div>
            </div>
            <div className="side-chapter-controls">
                <Select values={chapters} selected={selected} setSelected={setSelected} selectTitle="Chapter" customStyles={{height: '25px'}} />
                <Select values={pages} selected={pageSelected} setSelected={setPageSelected} selectTitle="Page" customStyles={{height: '25px'}} />
            </div>
            <hr style={{width: '100%', opacity: '0.4', margin: '1rem 0px'}} />
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', marginLeft: '7px'}}>
                {/* <LinkList ico={<svg data-v-20f285ec="" data-v-79551784="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-book-open text-icon-black dark:text-icon-white text-false icon"><path data-v-20f285ec="" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>} 
                    title="Current manga" isSvg={true} bgColor={'#f0f1f2'}></LinkList> */}
            </div>
        </div>
    );
};

export default SideReader;