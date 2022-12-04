import React, { useRef } from 'react';
import { flags } from '../../../Assets/Svg/Flags';
import Img from '../../../SharedUI/StyledComponents/Img/Img';
import './mangaVariables.scss';

const MangaVar2 = ({ manga, mangaCover }) => {
    const ref = useRef();

    return (
        <div style={{display: "block"}} ref={ref}>
            <div className="manga-img-var2">
                <Img src={mangaCover} alt='' draggable={false} />
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