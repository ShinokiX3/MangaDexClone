import React, { useState, useEffect, useRef } from 'react';
import { flags } from '../../../Assets/Svg/Flags';
import MangaDexApi from '../../../Services/MangaDexApi';
import Img from '../../../SharedUI/StyledComponents/Img/Img';
import './mangaVariables.scss';

const MangaVar2 = ({ manga }) => {
    const ref = useRef();
    const [mangaCover, setMangaCover] = useState('');

    useEffect(() => {
        (async() => {
            const cover = await MangaDexApi.getMangaCover(manga?.id);
            setMangaCover(cover);
        })()
    }, [manga])

    return (
        <div style={{display: "block"}} ref={ref}>
            <div className="manga-img-var2">
                <Img src={mangaCover} alt='' draggable={false} />
                {/* <img src={mangaCover} alt="" draggable="false" /> */}
                <div className="flag-img-var2">
                    <img src={flags[manga?.attributes?.originalLanguage]} alt="" />
                </div>
            </div>
            <div className="manga-de-var2">
                <p>{manga?.attributes?.title?.en?.slice(0, 25)}</p>
            </div>
        </div>   
    );
};

export default MangaVar2;