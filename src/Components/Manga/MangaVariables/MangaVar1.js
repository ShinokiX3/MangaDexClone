import React, { useEffect, useState, useRef } from 'react';
import MangaDexApi from '../../../Services/MangaDexApi';
import Img from '../../../SharedUI/StyledComponents/Img/Img';
import './mangaVariables.scss';

const MangaVar1 = ({ manga, mangaCover }) => {
    const ref = useRef();

    return (
        <div style={{display: "flex"}} ref={ref}>
            <div className="manga-img">
                <Img src={mangaCover} alt="" draggable={false} />
            </div>
            <div className="manga-de">
                <p>{manga?.attributes?.title?.en?.slice(0, 25)}</p>
                <p>{manga?.attributes?.description?.en.slice(0, 150)}</p>
            </div>   
        </div>
    );
};

export default MangaVar1;