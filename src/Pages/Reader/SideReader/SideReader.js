import React from 'react';
import './side-reader.scss';
import Switcher from '../../../SharedUI/Controls/Switcher/Switcher';
import Combobox from '../../../SharedUI/Controls/Combobox/Combobox';
import LinkList from '../../../SharedUI/Form/LinkList';
// import { setChapterMenuStatus } from '../../../OldStore/userReducer';
import { setReaderStatus } from '../../../Store/Slices/menuSlice';
import { useDispatch } from 'react-redux';
import Button from '../../../SharedUI/Controls/Button/Button';

const SideReader = ({ data }) => {
    const dispatch = useDispatch();
    return (
        <div className="side-chapter-wrapp" style={{backgroundColor: 'white', minWidth: '250px'}}>
            <div className="side-chapter-utils">
                <div onClick={() => dispatch(setReaderStatus(false))}>
                    <svg data-v-20f285ec="" data-v-6b3fd699="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-currentColor icon"><path data-v-20f285ec="" d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
                <div>
                    <svg data-v-20f285ec="" data-v-6b3fd699="" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="text-currentColor icon"><path data-v-20f285ec="" d="m3 21 5-5m2-6-1 1s-2-2-5 1l8 8c3-3 1-5 1-5l1-1M1 1l22 22m-6-12 2-2h2l-6-6v2l-2 2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                </div>
            </div>
            <div className="sd-ch-links">
                <div>
                    <LinkList ico={<svg data-v-20f285ec="" data-v-79551784="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open text-icon-black dark:text-icon-white text-false icon"><path data-v-20f285ec="" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>} 
                        title="Komi-san wa Komyushou Desu." isSvg={true}></LinkList>
                </div>
                <div>
                    <LinkList ico={<svg data-v-20f285ec="" data-v-79551784="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-icon-black dark:text-icon-white text-false icon"><path data-v-20f285ec="" d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-20f285ec="" d="M13 2v7h7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>}
                        title="Chapter 5." isSvg={true} />
                </div>
            </div>
            <div className="side-chapter-controls">
                <Switcher data={data}>
                    <Combobox title={"Pages"} array={[]} />
                </Switcher>
                <Switcher data={data}>
                    <Combobox title={"Chapters"} array={[]} />
                </Switcher>
                <div>
                    <Button title="Report Chapter" bgColor="#f0f1f2" color="red"></Button>
                </div>
            </div>
            <hr style={{width: '100%', opacity: '0.4', margin: '1rem 0px'}} />
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', marginLeft: '7px'}}>
                <LinkList ico={<svg data-v-20f285ec="" data-v-79551784="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open text-icon-black dark:text-icon-white text-false icon"><path data-v-20f285ec="" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>} 
                    title="Komi-san" isSvg={true} bgColor={'#f0f1f2'}></LinkList>
                <LinkList ico={<svg data-v-20f285ec="" data-v-79551784="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open text-icon-black dark:text-icon-white text-false icon"><path data-v-20f285ec="" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>} 
                    title="Komi-san" isSvg={true} bgColor={'#f0f1f2'}></LinkList>
                <LinkList ico={<svg data-v-20f285ec="" data-v-79551784="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open text-icon-black dark:text-icon-white text-false icon"><path data-v-20f285ec="" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>} 
                    title="Komi-san" isSvg={true} bgColor={'#f0f1f2'}></LinkList>
                <LinkList ico={<svg data-v-20f285ec="" data-v-79551784="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open text-icon-black dark:text-icon-white text-false icon"><path data-v-20f285ec="" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>} 
                    title="Komi-san" isSvg={true} bgColor={'#f0f1f2'}></LinkList>
                <LinkList ico={<svg data-v-20f285ec="" data-v-79551784="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open text-icon-black dark:text-icon-white text-false icon"><path data-v-20f285ec="" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>} 
                    title="Komi-san" isSvg={true} bgColor={'#f0f1f2'}></LinkList>
                <LinkList ico={<svg data-v-20f285ec="" data-v-79551784="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open text-icon-black dark:text-icon-white text-false icon"><path data-v-20f285ec="" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>} 
                    title="Komi-san" isSvg={true} bgColor={'#f0f1f2'}></LinkList>
                <LinkList ico={<svg data-v-20f285ec="" data-v-79551784="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open text-icon-black dark:text-icon-white text-false icon"><path data-v-20f285ec="" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>} 
                    title="Komi-san" isSvg={true} bgColor={'#f0f1f2'}></LinkList>
            </div>
        </div>
    );
};

export default SideReader;