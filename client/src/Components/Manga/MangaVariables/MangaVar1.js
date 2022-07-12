import React, { useEffect, useState, useRef } from 'react';
import MangaDexApi from '../../../Services/MangaDexApi';
import './mangaVariables.scss';

const MangaVar1 = ({manga}) => {
    const ref = useRef();
    const [mangaCover, setMangaCover] = useState('');

    useEffect(() => {
        (async() => {
            const cover = await MangaDexApi.getMangaCover(manga?.id);
            setMangaCover(cover);
        })()
    }, [manga])

    return (
        <div style={{display: "flex"}} ref={ref}>
            <div className="manga-img">
                <img src={mangaCover} alt="" />
            </div>
            <div className="manga-de">
                <p>{manga?.attributes?.title?.en?.slice(0, 25)}</p>
                <p>{manga?.attributes?.description?.en.slice(0, 150)}</p>
            </div>   
        </div>
    );
};

export default MangaVar1;